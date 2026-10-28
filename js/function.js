document.addEventListener('DOMContentLoaded', () => {
  const openButtons = document.querySelectorAll('[data-open-order]');
  const closeButtons = document.querySelectorAll('[data-close-order]');
  const panel = document.querySelector('#orderPanel');
  const overlay = document.querySelector('#orderOverlay');
  const form = document.querySelector('#orderForm');
  const status = document.querySelector('#formStatus');

  function openPanel(){
    if(!panel || !overlay) return;
    panel.classList.add('open'); overlay.classList.add('open');
    panel.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    const first = panel.querySelector('input,select,textarea,button');
    if(first) first.focus();
  }
  function closePanel(){
    if(!panel || !overlay) return;
    panel.classList.remove('open'); overlay.classList.remove('open');
    panel.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }
  openButtons.forEach(btn => btn.addEventListener('click', openPanel));
  closeButtons.forEach(btn => btn.addEventListener('click', closePanel));
  if(overlay) overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if(e.key==='Escape') closePanel(); });

  if(form){
    form.addEventListener('submit', event => {
      event.preventDefault();
      if(!form.checkValidity()){
        form.classList.add('was-validated');
        form.reportValidity();
        return;
      }
      const data = new FormData(form);
      const name = String(data.get('nombre') || '').trim();
      const flavor = data.get('sabor');
      const size = data.get('presentacion');
      const quantity = data.get('cantidad');
      const delivery = data.get('direccion');
      if(!name || !flavor || !size || !quantity || !delivery){
        form.classList.add('was-validated');
        return;
      }
      status.innerHTML = `<strong>¡Pedido simulado, ${escapeHtml(name)}!</strong><br>Resumen: ${escapeHtml(quantity)} pieza(s) de Boing! sabor ${escapeHtml(flavor)}, presentación ${escapeHtml(size)}.<br><small>Dirección registrada en esta demostración: ${escapeHtml(delivery)}. No se realizó ninguna compra real.</small>`;
      status.classList.add('show');
      status.scrollIntoView({behavior:'smooth',block:'nearest'});
      form.reset();
      form.classList.remove('was-validated');
    });
  }
  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }
});