const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync(process.argv[2], 'utf8');
const nodes = new Map();
const storage = new Map();
const context = vm.createContext({
  location: {hash: '#/'},
  window: {addEventListener() {}},
  document: {getElementById(id) { return nodes.get(id) || null; }},
  localStorage: {getItem(k) {return storage.get(k) || null},setItem(k,v) {storage.set(k,v)},removeItem(k) {storage.delete(k)}},
  FormData: class {constructor(form) {this.data = form.data} get(k){return this.data[k]} entries(){return Object.entries(this.data)}},
});
nodes.set('app', {innerHTML: ''});
vm.runInContext(source, context);
assert(nodes.get('app').innerHTML.includes('MadCat Studio'));
assert.equal(vm.runInContext(`esc('<img src=x onerror="alert(1)">&')`, context), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;&amp;');
for (const route of ['#/', '#/works', '#/works/night-shelter', '#/talk', '#/brief', '#/account', '#/system']) {
  context.location.hash = route;
  vm.runInContext('render()', context);
  assert(nodes.get('app').innerHTML.length > 100);
}
function submit(id, data) {
  const form = {data, addEventListener(name, handler) {this.handler=handler}};
  nodes.set(id, form);
  vm.runInContext('bind()', context);
  form.handler({preventDefault(){}});
  nodes.delete(id);
}
context.location.hash='#/talk';
submit('talk-form', {text:'<script>alert(1)</script>'});
assert(!nodes.get('app').innerHTML.includes('<script>alert(1)</script>'));
assert(nodes.get('app').innerHTML.includes('Nothing has been sent'));
context.location.hash='#/brief';
submit('brief-form',{name:'Test',email:'test@example.invalid',intent:'Draft'});
assert(nodes.get('app').innerHTML.includes('Local draft — not sent'));
context.location.hash='#/account';
submit('account-form',{name:'Test',email:'test@example.invalid'});
assert(nodes.get('app').innerHTML.includes('not an authenticated account'));
console.log('PASS: boot, escaping, 7 routes, local note, local brief, local profile; no network API provided');
