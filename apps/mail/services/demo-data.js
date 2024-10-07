// export const demoEmails = [
    // {   
    //     id: 'fg24rgg',
    //     createdAt: 1551133930500,
    //     subject: 'Miss you!',
    //     body: 'Something else',
    //     isRead: false,
    //     isStarred: false,
    //     sentAt: 152345240594,
    //     removedAt: null,
    //     from: 'momo@momo.com',
    //     to: 'user@appsus.com'
    // },
//     {   
//         id: 'yj5j5',
//         createdAt: 1245133930600,
//         subject: 'Hello!',
//         body: 'Just checking in.',
//         isRead: true,
//         isStarred: true,
//         sentAt: 1513394330694,
//         removedAt: null,
//         from: 'user@appsus.com',
//         to: 'jane@doe.com'
//     },
//     {   
//         id: 'db3gt54',
//         createdAt: 1551133930700,
//         subject: 'Meeting Reminder',
//         body: 'Don\'t forget our meeting tomorrow at 10 AM.',
//         isRead: false,
//         isStarred: false,
//         sentAt: 139733930794,
//         removedAt: null,
//         from: 'boss@company.com',
//         to: 'user@appsus.com'
//     }
// ]

export const demoEmails = Array.from({ length: 50 }, (_, index) => {
    const isUserSender = Math.random() > 0.5 // Randomly decide if the user is the sender
    
    return {
        id: `id${index + 1}`,
        createdAt: Date.now() - Math.floor(Math.random() * 10000000000),
        subject: `Subject ${index + 1}`,
        body: `This is the body of email ${index + 1}`,
        isRead: Math.random() > 0.5,
        isStarred: false,
        isImportant: false,
        labels: ['inbox', 'romantic'],
        sentAt: Date.now() - Math.floor(Math.random() * 10000000000),
        removedAt: null,
        from: isUserSender ? 'user@appsus.com' : `sender${index + 1}@example.com`,
        to: isUserSender ? `recipient${index + 1}@example.com` : 'user@appsus.com'
    }
})
