const { Client }  = require('@elastic/elasticsearch');

const client = new Client({ node: 'http://localhost:9200' });

const scriptSource = `
    def appUser = ctx._source.appUser;
    if(appUser != null){
        def appUserString = String.valueOf(appUser);
        def appUserReverse = new StringBuilder(appUserString).reverse().toString();

        //To Bytes
        char[] buffer = appUserReverse.toCharArray();
        byte[] bytes = new byte[buffer.length];
        for (int i = 0; i < bytes.length; i++) {
            bytes[i] = (byte) buffer[i];
        }

        def encodedAppUser = Base64.getEncoder().encodeToString(bytes);

        ctx._source.remove('appUser');
        ctx._source.put('appUser', encodedAppUser);
    }`

/**
 * Get indices filtered by suffix
 * @param {string} suffix 
 * @returns
 */
async function getIndicesBySuffix(suffix){
    const indices = await client.cat.indices({format: 'json'})
    const indicesBody = indices.body
    console.log("Loaded indices: %d", indicesBody.length);
    console.log("Filter indices by suffix: '%s'", suffix);
    const indexFiltered = indicesBody.filter(indice => indice.index.startsWith(suffix))
    console.log("Filtered indices by suffix: %d", indexFiltered.length);

    return indexFiltered
}

/**
 * Get DateTime in minutes between a date and now
 * @param {Date} dateToCompare 
 * @returns 
 */
function getDateTimeDiffencesInMinutes(dateToCompare){
    const dateActual = new Date();
    const differenceInTime = dateActual.getTime() - dateToCompare.getTime();
    const differenceInMinutes = Math.round(((differenceInTime % 86400000) % 3600000) / 60000);
    return differenceInMinutes
}

/**
 * Nanos to minutes and seconds
 * @param {Number} nanos 
 * @returns 
 */
function nanosToMinutesAndSeconds(nanos) {
    let millis = (nanos)/1000000
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

/**
 * Display on console the task tesponse
 * @param {import('@elastic/elasticsearch').ApiResponse} response 
 */
function displayOnConsoleTaskResponseDetail(response){
    const responseTotal = response.body.response.total;
    const responseUpdated = response.body.response.updated;
    const responseFailures = response.body.response.failures;
    
    console.log("Task '%s' completed!", response.body.task.id);
    console.log("-Task Date Start:              %s", new Date(response.body.task.start_time_in_millis).toUTCString());
    console.log("-Task Date End:                %s", new Date().toUTCString());
    console.log("-Task Running Time in Minutes: %s", nanosToMinutesAndSeconds(response.body.task.running_time_in_nanos));
    console.log("-Task Status Code:             %d", response.statusCode);
    console.log("-Task Response Total:          %d", response.body.response.total);
    console.log("-Task Response Updated:        %d", response.body.response.updated);
    
    if(responseFailures && responseFailures.length){
        console.error("[ERROR] Task Response Failures is not empty!");
        for(const failure of responseFailures){
            console.error(`[ERROR] Failure with status ${failure.status} in '${failure.id}' with type '${failure.type}'. Reason: ${failure.cause.reason}`)
        }
    }

    if (responseTotal !== responseUpdated){
       console.error(`[ERROR] Not all index actions have been updated, Total Actions: ${responseTotal} Total Actions Updated: ${responseUpdated} `)
    } 
}

(async () => {
    const indexFilter = process.env.INDEX_FILTER;
    if(!indexFilter){
        throw "Index filter required. Set environment variable 'INDEX_FILTER' with a value.";
    }

    const indices = await getIndicesBySuffix(indexFilter);
        
    for(const indice of indices){
        const healthReponse = await client.cluster.health();
        if (healthReponse.body.status !== 'green'){
            throw `The cluster is on alert, the status is ${healthReponse.body.status}`
        }

        const index = indice.index;
        console.log("Updating by query index '%s'", index);

        const response = await client.updateByQuery(
            {
            index: index, 
            body: {
                "query": {
                    "constant_score" : {
                        "filter" : {
                            "bool": {
                                "must": {"exists": {"field": "appUser"}},
                            }
                        }
                    }
                },
                "script": { "source": scriptSource}
            },
            waitForCompletion: false
        });

        const task = response.body.task;
        console.log("Created task '%s' to update by query", task);
        
        const responseStatusCode = response.statusCode;
        if(responseStatusCode != 200){
            console.warn("Status Code in update by query response is not 200. Response Status Code: %d", responseStatusCode);
        }

        const responseWarnings = response.warnings;
        if(responseWarnings){
            console.warn("Warnings in update by query response is not empty");
        }

        let taskCompleted = false;
        let dateToCompare = new Date();
            
        while(!taskCompleted){
            const differenceInMinutes = getDateTimeDiffencesInMinutes(dateToCompare);
            if(differenceInMinutes < 1){
                continue;
            }

            const tasksGetResponse = await client.tasks.get({task_id: task});
            if(!tasksGetResponse.body.completed){
                dateToCompare = new Date();
                continue;
            }
            
            displayOnConsoleTaskResponseDetail(tasksGetResponse);
            taskCompleted = true;
        }
    }
})();