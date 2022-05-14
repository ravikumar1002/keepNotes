export const findAllLabel = (state) => {

    const labelReduceFn = (acc, curr) => {
        const removeDuplicate = curr.label.map((label) => {
             const findINAcc = acc.find((value => value.label === label.label))
             if(!findINAcc) {
                 return label
             }
        });
        const allLabelPresent = [...acc, ...removeDuplicate]
        const saveLabel = allLabelPresent.filter(label => label !== undefined ? label : false )
        return (acc = [...saveLabel]);
    };

    const labelData = state.reduce(labelReduceFn, []);
    return labelData
};
