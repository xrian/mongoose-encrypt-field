module.exports = {
	'extends': 'airbnb-base',
	'env': {
		'node': true,
		'commonjs': true,
		'mocha': true,
	},
	'parser': 'babel-eslint',
	'rules': {
		'arrow-body-style': ['error', 'as-needed'],
		'function-paren-newline': ['error', 'consistent'], // 强制在函数括号内使用一致的换行
		'no-use-before-define': ['error', { 'functions': false }], // 禁止变量使用前调用
		'no-param-reassign': ['error', { 'props': false }],
		'no-console': ['error', { allow: ['warn', 'error'] }], // 禁用 console(数组里面的除外)
		'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
		'no-confusing-arrow': ['error', { 'allowParens': true }], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
		'prefer-const': ['error', { 'ignoreReadBeforeAssign': false }], // 建议使用const
		'prefer-arrow-callback': ['error', { 'allowNamedFunctions': true }],
	}
};
