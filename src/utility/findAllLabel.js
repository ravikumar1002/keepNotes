export const findAllLabel = (ladelData) => {

    const labelReduceFn = (acc, curr) => {
        const removeDuplicate = curr.label.map((label) => {
             const findINAcc = acc.find((value => value._id === label._id))
             if(!findINAcc) {
                 return label
             }
        });
        const allLabelPresent = [...acc, ...removeDuplicate]
        const saveLabel = allLabelPresent.filter(label => label !== undefined ? label : false )
        return (acc = [...saveLabel]);
    };

    const labelData = ladelData.reduce(labelReduceFn, []);
    return labelData
};
