const errorHandler = errors =>{
    let result = {}
    // console.log( "HERE ",errors.use)
    const dateRegex = /^Cast to date failed for value/gmi
    Object.keys(errors).forEach(key =>{
        result[key]= (errors[key].message)
        if(dateRegex.test(result[key]))result[key] = 'Date is required'
    })
    console.log(result)
    return result
}

module.exports = errorHandler