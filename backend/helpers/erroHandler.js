const errorHandler = errors =>{
    let result = {}
    // console.log( "HERE ", errors.date, ' END')
    const dateRegex = /^Cast to date failed for value/gmi
    Object.keys(errors).forEach(key =>{
        result[key]= (errors[key].message)
        if(dateRegex.test(result[key]))result[key] = 'Date is required'
    })
    return result
}

module.exports = errorHandler