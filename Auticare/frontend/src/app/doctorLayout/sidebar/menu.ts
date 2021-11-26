import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.DOCTOR.TEXT',
        icon: 'bx-home-circle',
        link: '/doctor',
        
    },
    {
        id: 1,
        label: 'MENUITEMS.DOCTOR.APPOINTMENTS',
        icon: 'bx-task',
        link: '/doctor',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DOCTOR.LIST.SKILLASSESSMENT',
                link: '/doctor',
                parentId: 2
            },
            {
                id: 3,
                label: 'MENUITEMS.DOCTOR.LIST.SESSIONBOOKING',
                link: '/doctor',
                parentId: 2 
            },
            
            {
                id: 3,
                label: 'MENUITEMS.DOCTOR.LIST.CONSULTATION',
                link: '/doctor/consultation',
                parentId: 2 
            },
          
        ]
    },
    {
        id: 1,
        label: 'MENUITEMS.DOCTOR.PROFILE',
        icon: 'bx-group',
        link: '/doctor/profile',
        
    },
    
];

