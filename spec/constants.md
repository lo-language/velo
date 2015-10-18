## Constants

Constants can be defined in two ways: using `is` to create an absolute constant, and using distinguish to create relative constants.

Use define when you want to associate a value with a name for the lifetime of a procedure's execution.

	port is 443;

Use distinguish when you want to distinguish between values without caring how they're represented. For example, if you 

	distinguish top, bottom, left, right;
	
### Scope

Constants can be defined anywhere and obey the same scoping rules as variables. However, sometimes you'd like to define constants that span modules. Exa permits you to do this with a concept of a *package scope* that only applies to constants.

To create constants in package scope, create a separate file in the same directory as your modules called constants.exa that only contains constant declarations. This file will be automatically loaded when any module in the directory is loaded.