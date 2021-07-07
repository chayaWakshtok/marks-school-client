import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
    {
        name: '',
        url: '/',
    },
    // {
    //     name: 'מחנכת - מחצית א',
    //     url: '/teacher/types/1',
    //     icon: 'icon-book-open',
    // },
    // {
    //     name: 'מחנכת - מחצית ב',
    //     url: '/teacher/types/1',
    //     icon: 'icon-book-open',
    // },
    {
        name: 'מחצית א',
        url: '/teacher/',
        icon: 'icon-direction',
        children: [
            {
                name: 'הערכות לתעודה',
                url: '/teacher/evaluation/1',
                icon: 'icon-badge',
            },
            {
                name: 'הזנת נתוני תעודה',
                url: '/teacher/types/1',
                icon: 'icon-book-open',
            },
            {
                name: 'תעודות',
                url: '/teacher/cert/1',
                icon: 'icon-graduation',
            },
        ]
    },
    {
        name: 'מחצית ב',
        url: '/teacher/',
        icon: 'icon-direction',
        children: [
            {
                name: 'הערכות לתעודה',
                url: '/teacher/evaluation/2',
                icon: 'icon-badge',
            },
            {
                name: 'הזנת נתוני תעודה',
                url: '/teacher/types/2',
                icon: 'icon-book-open',
            },
            {
                name: 'תעודות',
                url: '/teacher/cert/2',
                icon: 'icon-graduation',
            },
        ]
    },
    {
        name: 'ציונים שנתיים',
        url: '/teacher/types/3',
        icon: 'icon-book-open',
    },

    {
        name: 'ציונים להבחנויות',
        url: '/teacher/tests',
        icon: 'icon-layers',
        children: [
            {
                name: 'בית ספרית',
                url: '/teacher/tests/school',
                icon: 'icon-briefcase',
            },
            {
                name: 'פנימית',
                url: '/teacher/tests/in',
                icon: 'icon-envelope-open',
            },
            {
                name: 'מגמות',
                url: '/teacher/tests/trend',
                icon: 'icon-directions',
            },
        ]
    },
    // {
    //     name: 'ציון פנימי',
    //     url: '/teacher/types/4',
    //     icon: 'icon-book-open',
    // },
    // {
    //     name: 'בגרות',
    //     url: '/teacher/types/5',
    //     icon: 'icon-book-open',
    // },
    // {
    //     name: 'מורות',
    //     url: '/secretary/teachers',
    //     icon: 'icon-user-following'
    // },
];
