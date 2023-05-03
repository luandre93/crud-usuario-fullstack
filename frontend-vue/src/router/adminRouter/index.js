import Administrativo from '@/views/Administrativo/Administrativo'
import Usuarios from '@/views/Administrativo/Usuarios'

const adminRouter = [{
    path: '/Administrativo',
    name: 'Administrativo',
    disableAccess: false,
    props: {
        disableAccess: false,
        icon: 'mdi-account-cog'
    },
    component: Administrativo,
    children: [{
        path: '/Administrativo/Usuarios',
        name: 'Usuarios',
        component: Usuarios,
        disableAccess: false,
        props: {
            disableAccess: false,
            icon: 'mdi-account-group'
        },
    }]
}]

export default adminRouter;