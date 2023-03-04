function transformTextToHtml(text, className){
    const lines = text.split('\n');
    let html = '';
    for (const line of lines) {
        html += `<div class="${className}">${line} &nbsp;</div>`;
    }
    return html;
}