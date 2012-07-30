
window = {};
//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var gclosureExports	= {};
gclosureExports._output	= "";

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

gclosureExports.global	= function(property){
	console.assert( typeof(property) === 'string' )
	gclosureExports._output	+= "window['"+property+"'] = "+property+";\n"
	return this;
}
gclosureExports.property	= function(obj, property){
	console.assert( typeof(obj) === 'string' )
	console.assert( typeof(property) === 'string' )
	gclosureExports._output	+= obj+"['"+property+"'] = "+obj+"."+property+";\n"
	return this;
}
gclosureExports.properties= function(name, obj){
	console.assert( typeof(name) === 'string' )
	console.assert( typeof(obj) === 'object' )
	for(var property in obj){
		if( obj.hasOwnProperty(property) === false )	continue;
		gclosureExports.property(name, property)
	};
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

gclosureExports.dump	= function(){
	console.log('// Google closure compiler exports')
	console.log(gclosureExports._output);
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

/**
 * helper to define a class based on .prototype
*/
gclosureExports.Class	= function(parentStr, classStr){
	if( parentStr === 'window' ){
		// export the class itself
		gclosureExports.global(classStr);
		// export all the properties of .prototype
		var prototypeStr	= classStr+'.prototype';
		gclosureExports.properties(prototypeStr, eval(prototypeStr));
	}else{
		// export the class itself
		gclosureExports.property(parentStr, classStr);	
		// export all the properties of .prototype
		var prototypeStr	= parentStr+'.'+classStr+'.prototype';
		gclosureExports.properties(prototypeStr, eval(prototypeStr));
	}
	return this;
}

/**
 * helper to define a class based on .prototype
*/
gclosureExports.Singleton	= function(parentStr, classStr){
	if( parentStr === 'window' ){
		// export the class itself
		gclosureExports.global(classStr);
		// export all the properties of .prototype
		gclosureExports.properties(classStr, eval(classStr));
	}else{
		// export the class itself
		gclosureExports.property(parentStr, classStr);	
		// export all the properties of .prototype
		var singletonStr= parentStr+'.'+classStr;
		gclosureExports.properties(singletonStr, eval(singletonStr));
	}
	return this;
}

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var aClass	= function(){
	var str = 'hello world :' + this.aFunction();
};

aClass.prototype.aFunction	= function(){
	var hello	= 1;
	var world	= 2;
	return hello + world;
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

Object.prototype.foobar	= function(){};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var aSingleton	= {};
aSingleton.aNumber	= 42;


//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var aNameSpace	= {};
aNameSpace.fooClass	= function(){
};

//////////////////////////////////////////////////////////////////////////////////
//										//
//////////////////////////////////////////////////////////////////////////////////

var aNestedNamespace	= {};
aNestedNamespace.NestedSpace	= {};
aNestedNamespace.NestedSpace.barClass	= function(){
};

gclosureExports.Class('window', 'aClass');

gclosureExports.property('Object.prototype', 'foobar')

gclosureExports.Singleton('window', 'aSingleton');

gclosureExports.global('aNameSpace');
gclosureExports.Class('aNameSpace', 'fooClass');

gclosureExports.global('aNestedNamespace');
gclosureExports.Singleton('aNestedNamespace', 'NestedSpace');
gclosureExports.Class('aNestedNamespace.NestedSpace', 'barClass');

gclosureExports.dump();
