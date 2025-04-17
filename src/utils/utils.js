const replaceSizeInDescription = (html, newSize) => {
    if (!html || !newSize) return html;
    return html.replace(
      /(<span class="label">Taille&nbsp;: <\/span><em class="value">)(.*?)(<\/em>)/,
      `$1${newSize}$3`
    );
};
  
export default replaceSizeInDescription;