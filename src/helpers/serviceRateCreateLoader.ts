const serviceRateCreateLoader = async ({
    params,
    request,
}: {
    params: any
    request: any
}) => {
    return {
        id: params.id,
        endpointOriginal: request.url.split('/')[3],
        endpointNested: request.url.split('/')[6],
        rateId: params.rateId,
        mode: 'create',
    }
}

export default serviceRateCreateLoader
