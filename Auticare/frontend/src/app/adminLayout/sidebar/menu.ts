import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
  {
    id: 3,
    label: "MENUITEMS.ADMIN.LIST.CARECHILDEN",
    link: "/admin/users",
    icon: "bx-user",
    parentId: 2,
  },
  {
    id: 3,
    label: "MENUITEMS.ADMIN.LIST.THERAPIST",
    link: "/admin/therapist-details",
    icon: "bx-user-plus",
    parentId: 2,
  },
  {
    id: 3,
    label: "MENUITEMS.ADMIN.LIST.INSTITUTION",
    link: "/admin/add-institution",
    icon: "bx-user-plus",
    parentId: 2,
  },
 

  {
    id: 3,
    label: "MENUITEMS.ADMIN.LIST.ASSESSMENTS",
    link: "/admin/score",
    icon: "bxs-report",
    parentId: 2,
    subItems: [
      {
        id: 3,
        label: "MENUITEMS.ADMIN.ASSESSMENTS.FREEASSESSMENT", 
        link: "/admin/score",
        parentId: 2,
      },
      {
        id: 3,
        label: "MENUITEMS.ADMIN.ASSESSMENTS.SKILLASSESSMENT",
        link: "/admin/therapy-session",
        parentId: 2, 
      },
    ],
  },
  {
    id: 3,
    label: "MENUITEMS.ADMIN.LIST.SKILLTRAININGPACK",
    link: "/admin/score",
    icon: "bxs-report",
    parentId: 2,
    subItems: [
      {
        id: 3,
        label: "MENUITEMS.ADMIN.SKILLTRAININGPACK.AUTISUM", 
        link: "/admin/autism-pack",
        parentId: 2,
      },
      {
        id: 3,
        label: "MENUITEMS.ADMIN.SKILLTRAININGPACK.LEARNINGDISABILITY",
        
        parentId: 2, 
      },
      {
        id: 3,
        label: "MENUITEMS.ADMIN.SKILLTRAININGPACK.SPECIALEDUCATION",
       
        parentId: 2, 
      },
    ],
  },

  {
    id: 1,
    label: "MENUITEMS.ADMIN.LIST.APPOINTMENTS",
    icon: "bx-calendar",
    link: "/ADMIN",
    subItems: [
      {
        id: 3,
        label: "MENUITEMS.ADMIN.APPOINTMENETS.FREEASSESSMENT",
        link: "/admin/appointment",
        parentId: 2,
      },
      {
        id: 3,
        label: "MENUITEMS.ADMIN.APPOINTMENETS.THERAPYSESSION",
        link: "/admin/therapy-session",
        parentId: 2,
      },
      {
        id: 3,
        label: "MENUITEMS.ADMIN.APPOINTMENETS.THERAPYBOOKING",
        link: "/admin/therapy-booking",
        parentId: 2,
      },
    ],
  },
  {
    id: 1,
    label: "MENUITEMS.BOOK.TEXT",
    icon: "bx-book",
    link: "/home/assessments",
    subItems: [
      {
        id: 3,
        label: "MENUITEMS.ADMIN.BOOKAPPOINTMENET.THERAPYBOOKING",
        link: "/admin/therapy-booking",
        parentId: 2,
      },
      {
        id: 3,
        label: "MENUITEMS.ADMIN.BOOKAPPOINTMENET.THERAPYSESSION",
        link: "/admin/therapy-session",
        parentId: 2,
      },
    ]
  },
  {
    id: 1,
    label: "MENUITEMS.REPORT.TEXT",
    icon: "bx-task",
    link: "/admin/therapy-session",
  },
];
