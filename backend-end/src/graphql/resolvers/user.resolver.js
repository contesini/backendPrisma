import bcrypt from 'bcryptjs'

const Resolver = {
    User: {
        id: (parent, args, context, info) => {
            return parent.id
        },
        name: (parent, args, context, info) => {
            return parent.name
        },
        email: (parent, args, context, info) => {
            return parent.email
        },
        phone: (parent, args, context, info) => {
            return parent.phone
        },
        resetsPassword: (parent, args, context, info) => {
            return context.prisma.resetPasswords({ where: { user: { id: parent.id } } })
        },
        createdAt: (parent, args, context, info) => {
            return parent.createdAt
        },
        updatedAt: (parent, args, context, info) => {
            return parent.updatedAt
        },
    }
}

const Query = {
    user: async (parent, { where }, context) => {
        const user = await context.prisma.user(where)
        user.password = "";
        return user;
    },
    users: (parent, args, context) => {
        return context.prisma.users(args)
    },
}

const Mutation = {
    updateUser: async (parent, args = { data, where }, context) => {
        if (args.data.password) {
            const salt = bcrypt.genSaltSync(10);
            args.data.password = bcrypt.hashSync(args.data.password, salt);
        }
        const user = context.prisma.updateUser(args)
        user.password = ''
        return user
    },
    createUser: async (parent, { data }, context) => {
        if (data.password) {
            const salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        }
        const user = await context.prisma.createUser(data)
        user.password = ''
        return user
    },
}

export default {
    Resolver,
    Query,
    Mutation
}