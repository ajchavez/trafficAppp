

// Added by the Spring Security Core plugin:
grails.plugin.springsecurity.userLookup.userDomainClassName = 'trafficapp.User'
grails.plugin.springsecurity.userLookup.authorityJoinClassName = 'trafficapp.UserRole'
grails.plugin.springsecurity.authority.className = 'trafficapp.Role'
grails.plugin.springsecurity.controllerAnnotations.staticRules = [
	[pattern: '/',               	access: ['permitAll']],
	[pattern: '/error',          	access: ['permitAll']],
	[pattern: '/index/**',    		access: ['permitAll']],
	[pattern: '/index.gsp/**',		access: ['permitAll']],
	[pattern: '/shutdown',       	access: ['permitAll']],
	[pattern: '/**/assets/**',   	access: ['permitAll']],
	[pattern: '/**/js/**',       	access: ['permitAll']],
	[pattern: '/**/css/**',      	access: ['permitAll']],
	[pattern: '/**/images/**',   	access: ['permitAll']],
	[pattern: '/**/favicon.ico', 	access: ['permitAll']],
	[pattern: '/**/home/**',     	access: ['permitAll']],

	//for access to javascripts
	[pattern: '/**/studentJoin.js/**',      		access: ['permitAll']],
	[pattern: '/**/studentLeaflet.js/**',      		access: ['permitAll']],
	[pattern: '/**/professorLeaflet.js/**',      	access: ['permitAll']],
	[pattern: '/**/polylineDecorator.js/**',      	access: ['permitAll']],

	//for access to Link and Node tables
	[pattern: '/**/GameSettingsController/**',      access: ['ROLE_ADMIN']],
	[pattern: '/**/HomeController/**',       		access: ['permitAll']],
	[pattern: '/**/LinkController/**',        		access: ['permitAll']],
	[pattern: '/**/NodeController/**',       		access: ['permitAll']],
	[pattern: '/**/PostGameController/**',        	access: ['ROLE_ADMIN']],
	[pattern: '/**/ProfessorController/**',        	access: ['ROLE_ADMIN']],
	[pattern: '/**/StudentController/**',       	access: ['permitAll']],
	[pattern: '/**/StudentJoinController/**',       access: ['permitAll']],
	[pattern: '/**/StudentTurnController/**',       access: ['permitAll']],

	//for access to domains
	[pattern: '/**/GameSettings/**',        		access: ['ROLE_ADMIN']],
	[pattern: '/**/Link/**',        				access: ['permitAll']],
	[pattern: '/**/Node/**',        				access: ['permitAll']],
	[pattern: '/**/StudentTurn/**',        			access: ['permitAll']],

	//for access to views
	[pattern: '/**/gameSettings/**',        		access: ['ROLE_ADMIN']],
	[pattern: '/**/home/**',        				access: ['permitAll']],
	[pattern: '/**/layouts/**',        				access: ['permitAll']],
	[pattern: '/**/link/**',        				access: ['permitAll']],
	[pattern: '/**/node/**',        				access: ['permitAll']],
	[pattern: '/**/postGame/**',        			access: ['ROLE_ADMIN']],
	[pattern: '/**/professor/**',        			access: ['ROLE_ADMIN']],
	[pattern: '/**/student/**',        				access: ['permitAll']],
	[pattern: '/**/StudentJoin/**',       			access: ['permitAll']],
	[pattern: '/**/StudentTurn/**',       			access: ['permitAll']],



	//for admin access to dbconsole
	[pattern: '/**/dbconsole/**',   access: ['ROLE_ADMIN']],
]

grails.plugin.springsecurity.filterChain.chainMap = [
	[pattern: '/assets/**',      filters: 'none'],
	[pattern: '/**/js/**',       filters: 'none'],
	[pattern: '/**/css/**',      filters: 'none'],
	[pattern: '/**/images/**',   filters: 'none'],
	[pattern: '/**/favicon.ico', filters: 'none'],
	[pattern: '/**',             filters: 'JOINED_FILTERS']
]

environments {
	production {
		grails.dbconsole.enabled = true
		grails.dbconsole.urlRoot = '/dbconsole'
	}
}


