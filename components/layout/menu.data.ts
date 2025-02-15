export interface IMenuItem {
    name: string
    url: string
    icon: string
}

export const MENU_DATA: IMenuItem[] = [
    {
        name: 'Заказы',
        url: '/',
        icon: 'line-md:home-simple-filled',
    },
    {
        name: 'Клиенты',
        url: '/customers',
        icon: 'line-md:account',
    },
    {
        name: 'Отчет',
        url: '/report',
        icon: 'line-md:clipboard',
    },
    {
        name: 'Настройки',
        url: '/settings',
        icon: 'line-md:cog-filled-loop',
    },
    {
        name: 'Поддержка',
        url: '/help',
        icon: 'line-md:question-circle',
    },
]