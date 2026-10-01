const parablesData = {
    "virgins": {
        id: "virgins",
        title: "مثل العذارى الحكيمات",
        trivia: [
            { q: "ماذا يمثل الزيت في المثل؟", options: ["الروح القدس والاستعداد الروحي", "المال والغنى", "المظهر الخارجي"], answer: 0 },
            { q: "كم كان عدد العذارى الحكيمات؟", options: ["3", "5", "10"], answer: 1 },
            { q: "ماذا حدث عندما جاء العريس؟", options: ["دخلت المستعدات فقط", "دخل الجميع", "لم يدخل أحد"], answer: 0 }
        ]
    },
    "sower": {
        id: "sower",
        title: "مثل الزارع",
        soils: [
            { type: "wayside", name: "على الطريق", good: false },
            { type: "stony", name: "الأرض المحجرة", good: false },
            { type: "thorns", name: "بين الشوك", good: false },
            { type: "good", name: "الأرض الجيدة", good: true }
        ]
    },
    "prodigal": {
        id: "prodigal",
        title: "مثل الابن الضال",
        timeline: [
            { id: 1, text: "طلب الميراث", icon: "💰" },
            { id: 2, text: "تبذير المال", icon: "🍷" },
            { id: 3, text: "الجوع والخنازير", icon: "🐖" },
            { id: 4, text: "الندم والرجوع", icon: "💭" },
            { id: 5, text: "حضن الآب", icon: "👑" }
        ]
    },
    "sheep": {
        id: "sheep",
        title: "مثل الخروف الضال",
        totalSheep: 99
    },
    "samaritan": {
        id: "samaritan",
        title: "مثل السامري الصالح",
        items: [
            { id: "oil-wine", name: "زيت وخمر", icon: "🏺", correct: true },
            { id: "sword", name: "سيف (للانتقام)", icon: "⚔️", correct: false },
            { id: "bandages", name: "عصائب (للجروح)", icon: "🩹", correct: true },
            { id: "coins", name: "ديناران", icon: "🪙", correct: true },
            { id: "ignore", name: "تجاهل ومضي", icon: "🚶‍♂️", correct: false }
        ]
    }
};
