gclosureExports.Class('window', 'aClass');

gclosureExports.property('Object.prototype', 'foobar')

gclosureExports.Singleton('window', 'aSingleton');

gclosureExports.global('aNameSpace');
gclosureExports.Class('aNameSpace', 'fooClass');

gclosureExports.global('aNestedNamespace');
gclosureExports.Singleton('aNestedNamespace', 'NestedSpace');
gclosureExports.Class('aNestedNamespace.NestedSpace', 'barClass');
