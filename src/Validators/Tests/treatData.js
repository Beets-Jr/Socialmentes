export const treatQuestionValues = (levels) => {

    const treatData = levels;
    
    Object
        .entries( levels )
        .forEach( level => {
            Object
                .entries( level[1] )
                .forEach( category => {
                    Object
                        .entries( category[1] )
                        .forEach( question => {
                            if (typeof question[1] === "string")
                                treatData[level[0]][category[0]][question[0]] = Number(question[1]);
                        });
                });
        });

    return treatData;

};