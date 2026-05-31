// Função responsável por alternar as classes de estilo no body
function setTheme(theme) {
    // Primeiro, limpamos qualquer tema existente
    document.body.className = ''; 
    
    // Aplicamos o tema selecionado
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else if (theme === 'sepia') {
        document.body.classList.add('sepia-theme');
    }
    // Se o tema for 'light', ele fica sem classe extra (usando o :root padrão do CSS)
}
// Ativar/Desativar a classe da régua no body
function toggleRuler() {
    document.body.classList.toggle('ruler-active');
}

// Capturar o eixo Y do mouse e mover a div
document.addEventListener('mousemove', function(e) {
    if(document.body.classList.contains('ruler-active')) {
        const ruler = document.getElementById('ruler');
        // Centraliza a régua no cursor do mouse
        ruler.style.top = e.clientY + 'px';
    }
});
function toggleFont() {
    document.body.classList.toggle('dyslexic-font');
}

// 1. Função para o botão de Ligar/Desligar a régua visual
function toggleRuler() {
    document.body.classList.toggle('ruler-active');
}

// 2. Evento para capturar o movimento do mouse
document.addEventListener('mousemove', function(event) {
    // Só move a régua se ela estiver ativada no body
    if(document.body.classList.contains('ruler-active')) {
        const ruler = document.getElementById('ruler');
        // Pega a posição vertical (Y) do mouse e aplica na régua
        ruler.style.top = event.clientY + 'px';
    }
});

function toggleFont() {
    document.body.classList.toggle('dyslexic-font');
};