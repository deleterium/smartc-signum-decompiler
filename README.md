# SmartC Signum Decompiler
Decompiler for Signum smart contracts: Machine code to SmartC assembly

# Setup
This library can be obtained through npm:
```
npm install smartc-signum-decompiler
```

# Usage
Simple use
```
import Decomp from 'smartc-signum-decompiler';

import Decomp from '../index'

const machineCode = '28'
const Options = {
    machineCode,
    variables: ['a', 'b', 'c', 'teste_d', 'r0'],
    labels: [{ address: 253, label: '__fn_main' }],
    padInstruction: ''
}
const result = new Decomp(Options).decompile()
// Use:
// result.assemblyProgram
// result.variables
// result.labels
```

Options properties are all optionals, but one of attachmentBytes, creationBytes or machineCode must be supplied.
```js
Options: {
        attachmentBytes: string,
        creationBytes: string,
        machineCode: string,
        variables: string[],
        labels: Label[],
        padInstruction: string
    }
```

# Browser usage
You can use jsdelivr.net and import the es2020 module:

```html
<script type="module">
import Ssd from 'https://cdn.jsdelivr.net/npm/smartc-signum-decompiler/dist/index.js';

</script>

```

A file tester.html is included in this repo. It is possible to test the decompiler with `npm run webpage` then opening the browser at http://localhost:7001

# Social media
Join [SmartC Compiler](https://discord.gg/pQHnBRYE5c) server in Discord to stay tuned for news or ask questions.
