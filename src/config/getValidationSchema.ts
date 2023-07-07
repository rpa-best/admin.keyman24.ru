import * as yup from 'yup'

interface ISchema {
    [index: string]: object
}

const schema: ISchema = {
    device: yup.object({
        name: yup.string().required('emptyField'),
        type: yup.string(),
        desc: yup.string(),
    }),
    'device-type': {},
    'inventory-type': {},
    org: yup.object({
        name: yup.string().required('emptyField'),
        inn: yup.string(),
        address: yup.string(),
        phone: yup.string(),
        email: yup.string(),
        region: yup.number(),
    }),
    permission: yup.object({
        name: yup.string().required('emptyField'),
        level: yup.number(),
        slug: yup.string(),
    }),
    'permission-group': yup.object({
        name: yup.string().required('emptyField'),
        level: yup.number(),
    }),
    'permission-level': {},
    'permission-nested-permission-group': {},
    region: yup.object({
        name: yup.string().required('emptyField'),
        type: yup.number(),
        parent: yup.number(),
        status: yup.boolean(),
    }),
    'region-type': {},
    subscription: yup.object({
        start_date: yup.string().required('emptyField'),
        end_date: yup.string().required('emptyField'),
        org: yup.number(),
        user: yup.string(),
        service: yup.string().required('emptyField'),
    }),
    'subscription-request': yup.object({
        start_date: yup.string().required('emptyField'),
        end_date: yup.string().required('emptyField'),
        org: yup.number(),
        worker: yup.number(),
        phone: yup.string().required('emptyField'),
        desc: yup.string().required('emptyField'),
        service: yup.string().required('emptyField'),
        message: yup.number(),
    }),
    'subscription-service': yup.object({
        slug: yup.string().required('emptyField'),
        name: yup.string().required('emptyField'),
        desc: yup.string(),
        image: yup.string(),
        price: yup.number(),
    }),
    'system-message': yup.object({
        name: yup.string().required('emptyField'),
        slug: yup.string(),
        desc: yup.string(),
        type: yup.number(),
    }),
    user: yup.object({
        name: yup.string(),
        lastname: yup.string(),
        phone: yup.string(),
        email: yup.string(),
        surname: yup.string(),
        birthday: yup.string(),
        bio: yup.string(),
    }),
    'user-create': {
        username: yup.string().required('emptyField'),
        password1: yup.string().required('emptyField'),
        password2: yup.string().required('emptyField'),
    },
    worker: {},
    'org-nested-org': yup.object({
        from_date: yup.string(),
        to_date: yup.string(),
        to_org: yup.number().required('emptyField'),
    }),
    'device-nested-org': yup.object({
        id: yup.number().required('emptyField'),
    }),
    'subscription-nested-org': {},
    'working-area-type': yup.object({
        slug: yup.string().required('emptyField'),
        name: yup.string().required('emptyField'),
    }),
    'rate-nested-service': yup.object({
        value: yup.number().required('emptyField'),
        not_limeted: yup.boolean().required('emptyField'),
        key: yup.string().required('emptyField'),
    }),
    'service-rate-key': yup.object({
        name: yup.string().required('emptyField'),
        model_name: yup.string().required('emptyField'),
    }),
}

const getValidationSchema = (key: string) => {
    return schema[key]
}

export default getValidationSchema

// const schema = {
//     device: {},
//     'device-type': {},
//     'inventory-type': {},
//     org: {},
//     permission: {},
//     'permission-group': {},
//     'permission-level': {},
//     'permission-nested-permission-group': {},
//     region: {},
//     'region-type': {},
//     subscription: {},
//     'subscription-service': {},
//     'subscription-request': {},
//     'system-message': {},
//     user: {},
//     worker: {},
//     'org-nested-org': {},
//     'device-nested-org': {},
//     'subscription-nested-org': {},
// }
