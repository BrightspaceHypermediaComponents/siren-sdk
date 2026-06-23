import { addExtensions, litConfig, setDirectoryConfigs, testingConfig } from 'eslint-config-brightspace';

export default [
	{ ignores: ['docs'] },
	...setDirectoryConfigs(
		addExtensions(litConfig, ['.js', '.html']),
		{ '**/test': testingConfig }
	),
	{
		rules: {
			'no-prototype-builtins': 0,
			'sort-class-members/sort-class-members': 0
		}
	}
];
