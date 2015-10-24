var CoC=CoC || {};
CoC.utils = CoC.utils || {};

CoC.version = '1.6.0';

CoC.utils.typeOfs = {
  'string': 's',
  'object': 'o',
  'function': 'o',
  'number': 'i'
};

CoC.utils.styles = {
  'initialize': 'color:#55f; font-size:14px;',
  'link': 'color:#00c; font-size:14px;',
  'search': 'color:#000; text-shadow:1px 1px #ccc; font-size: 16px;',
  'io': 'color:#060; font-size:14px;',
  'filename': 'color:#000; text-shadow:1px 1px #ccc; font-size:14px;'
};

CoC.utils.applyArgumentsEffect = function(args){
  var array = [], argument, i, prefix = [];
  for(i = 0; i<args.length; i++){
    argument = args[i];
    if(argument && argument.value && argument.style){
      prefix.push('%c%'+CoC.utils.typeOfs[typeof argument.value]);
      array.push(CoC.utils.styles[argument.style]);
      array.push(argument.value);
    }
    else{
      prefix.push('%'+CoC.utils.typeOfs[typeof argument]);
      array.push(argument);
    }
  }
  array.unshift(prefix.join(' '));
  return array;
};

CoC.utils.log = function(){
  if (console && console.log)
    console.log.apply(console, CoC.utils.applyArgumentsEffect(arguments));
};

CoC.utils.info = function(){
  if(console && console.info){
    console.info.apply(console, CoC.utils.applyArgumentsEffect(arguments));
  }
  else if (console && console.log)
    console.log.apply(console, arguments);
};

CoC.utils.warn = function(){
  if(console && console.warn){
    console.warn.apply(console, CoC.utils.applyArgumentsEffect(arguments));
  }
  else if (console && console.log)
    console.log.apply(console, arguments);
};

CoC.utils.error = function(){
  if(console && console.error){
    console.error.apply(console, CoC.utils.applyArgumentsEffect(arguments));
  }
  else if (console && console.log)
    console.log.apply(console, arguments);
};
