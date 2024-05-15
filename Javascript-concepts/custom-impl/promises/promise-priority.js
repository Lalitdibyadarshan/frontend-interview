const resolveWithPriority = (dataList) => {
    const sortedDataList = dataList.sort((a, b) => a.priority - b.priority);
    return new Promise((resolve, reject) => {
        let mostPriority = 0;
        const result = {};
        const errors = {};

        sortedDataList.forEach(({task, priority}) => {
            task()
                .then(res => {
                    if(priority === mostPriority) {
                        resolve(res);
                    } else {
                        result[priority] = res;
                    }
                })
                .catch(err => {
                    errors[priority] = err;
                    if (priority === mostPriority) {
                        mostPriority++;
                    }
                    if (mostPriority === dataList.length - 1) {
                        reject(errors);
                    }
                })
                .finally(() => {
                    if (!errors[mostPriority] && result[mostPriority]) {
                        resolve(result[mostPriority]);
                    }
                });
        });
    });
}