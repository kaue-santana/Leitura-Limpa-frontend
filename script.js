// Carregar preferências salvas ao iniciar
function loadPreferences() {
    const savedTheme = localStorage.getItem('theme');
    const savedFont = localStorage.getItem('dyslexic-font');
    const savedRuler = localStorage.getItem('ruler-active');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    }
    
    if (savedFont === 'true') {
        document.body.classList.add('dyslexic-font');
    }
    
    if (savedRuler === 'true') {
        document.body.classList.add('ruler-active');
    }
}

function applyTheme(theme) {
    const isDyslexicFont = document.body.classList.contains('dyslexic-font');
    const isRulerActive = document.body.classList.contains('ruler-active');
    
    document.body.className = ''; 
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme === 'sepia') {
        document.body.classList.add('sepia-theme');
    }
    
    if (isDyslexicFont) {
        document.body.classList.add('dyslexic-font');
    }
    
    if (isRulerActive) {
        document.body.classList.add('ruler-active');
    }
    
    localStorage.setItem('theme', theme);
}

function setTheme(theme) {
    applyTheme(theme);
}

function toggleRuler() {
    document.body.classList.toggle('ruler-active');
    const isActive = document.body.classList.contains('ruler-active');
    localStorage.setItem('ruler-active', isActive.toString());
}

document.addEventListener('mousemove', function(e) {
    if(document.body.classList.contains('ruler-active')) {
        const ruler = document.getElementById('ruler');
        ruler.style.top = e.clientY + 'px';
    }
});

function toggleFont() {
    document.body.classList.toggle('dyslexic-font');
    const isActive = document.body.classList.contains('dyslexic-font');
    localStorage.setItem('dyslexic-font', isActive.toString());
}

document.getElementById('btnProcessar').addEventListener('click', async function() {
    const texto = document.getElementById('inputText').value;
    const outputBox = document.getElementById('outputText');
    
    if (!texto.trim()) {
        outputBox.textContent = 'Por favor, cole um texto primeiro!';
        return;
    }
    
    outputBox.textContent = 'Processando...';
    
    try {
        const response = await fetch('/simplificar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ texto })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            outputBox.textContent = data.textoSimplificado;
        } else {
            outputBox.textContent = data.error || 'Ocorreu um erro.';
        }
    } catch (error) {
        outputBox.textContent = 'Erro ao conectar com o servidor. Verifique se o backend está rodando.';
        console.error(error);
    }
});

// Limpar resultado quando o texto de entrada for limpo
document.getElementById('inputText').addEventListener('input', function() {
    if (!this.value.trim()) {
        document.getElementById('outputText').textContent = '';
    }
});

// Carregar preferências ao carregar a página
loadPreferences();
