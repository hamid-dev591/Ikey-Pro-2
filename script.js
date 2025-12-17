// --- 1. الكيبورد (index.html) ---
const kbGrid = document.getElementById('kb-grid');
if(kbGrid) {
    const layout = ['esc','1','2','3','4','5','6','7','8','9','0','-','=','del','tab','q','w','e','r','t','y','u','i','o','p','[',']','\\','caps','a','s','d','f','g','h','j','k','l',';',"'",'enter','shift','z','x','c','v','b','n','m',',','.','/','shift','space'];
    layout.forEach(key => {
        const div = document.createElement('div');
        div.className = 'key';
        if(key === 'space') div.style.gridColumn = "span 10";
        if(['del','tab','caps','enter','shift'].includes(key)) div.style.gridColumn = "span 4";
        div.innerText = key.toUpperCase();
        div.id = `k-${key}`;
        kbGrid.appendChild(div);
    });

    document.addEventListener('mousemove', (e) => {
        const movable = document.getElementById('movable-kb');
        let x = (window.innerWidth / 2 - e.pageX) / 35;
        let y = (window.innerHeight / 2 - e.pageY) / 35;
        movable.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
    });
}

// --- 2. التحكم العالمي بالأزرار (الأحمر) ---
window.addEventListener('keydown', (e) => {
    let key = e.key.toLowerCase();
    if(key === ' ') key = 'space';
    if(key === 'backspace') key = 'del';
    const el = document.getElementById(`k-${key}`) || document.getElementById(`k-${e.code.toLowerCase()}`);
    if(el) {
        el.classList.add('active');
        if(key === 'space') e.preventDefault();
    }
});

window.addEventListener('keyup', (e) => {
    let key = e.key.toLowerCase();
    if(key === ' ') key = 'space';
    if(key === 'backspace') key = 'del';
    const el = document.getElementById(`k-${key}`) || document.getElementById(`k-${e.code.toLowerCase()}`);
    if(el) el.classList.remove('active');
});

// --- 3. منطق التعلم (learning.html) ---
const learnInp = document.getElementById('learn-input');
const targetTxt = document.getElementById('text-target');
const langSel = document.getElementById('lang-select');

if(learnInp && targetTxt) {
    const lessons = {
        en: "Experience is the name everyone gives to their mistakes",
        ar: "الخبرة هي الاسم الذي يطلقه الجميع على أخطائهم"
    };
    
    const updateLesson = () => {
        const l = langSel.value;
        targetTxt.innerText = lessons[l];
        targetTxt.style.direction = l === 'ar' ? 'rtl' : 'ltr';
        learnInp.style.direction = l === 'ar' ? 'rtl' : 'ltr';
        learnInp.value = "";
    };

    langSel.onchange = updateLesson;
    updateLesson();

    learnInp.addEventListener('input', () => {
        const original = targetTxt.innerText;
        const typed = learnInp.value;
        let hits = 0;
        for(let i=0; i<typed.length; i++) {
            if(typed[i] === original[i]) hits++;
        }
        document.getElementById('acc-val').innerText = Math.round((hits / typed.length) * 100) || 100;
    });
}

// --- 4. اختبار السرعة (typing-test.html) ---
const speedInp = document.getElementById('speed-input');
const timerVal = document.getElementById('timer-val');
if(speedInp) {
    let timerStarted = false;
    let timeLeft = 60;
    let charCount = 0;

    speedInp.addEventListener('input', () => {
        if(!timerStarted) {
            timerStarted = true;
            const counter = setInterval(() => {
                timeLeft--;
                timerVal.innerText = timeLeft;
                if(timeLeft <= 0) {
                    clearInterval(counter);
                    speedInp.disabled = true;
                    alert(`Finished! Your WPM: ${document.getElementById('wpm-val').innerText}`);
                }
            }, 1000);
        }
        charCount = speedInp.value.length;
        const wpm = Math.round((charCount / 5) / ((60 - timeLeft) / 60));
        document.getElementById('wpm-val').innerText = wpm || 0;
    });
}