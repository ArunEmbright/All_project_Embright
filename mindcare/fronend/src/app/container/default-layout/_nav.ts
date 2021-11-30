import { INavData } from "@coreui/angular";

export const navMenuItems: INavData[]=[

    {
        name:'Dashboard',
        icon: 'icon-screen-desktop',
        url: '/main/dashboard',
    },
    {
        title:true,
        name:'MAIN'
    },
    {
        name:'Profile',
        icon:'icon-user',
        url:'/user/profile'

        
    },
    {
        name:'Sheduled-Events',
        icon: 'icon-pencil',
        url:'/calendar/scheduled-list'
    }
    
]