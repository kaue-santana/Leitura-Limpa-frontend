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