module.exports = function(grunt) {
  	grunt.initConfig({
  		 //Post CSS
        postcss: {
            options: {
                    processors: [                       
                        require('autoprefixer'),
                    ]
                },
                dist: {
                    files: {
                        'dist/css/style.css' : 'src/css/style.css' 
                    }
                }
            },
      // Minify
      cssmin: {
			  target: {
			    files: [{
			      expand: true,
			      cwd: 'dist/css',
			      src: ['*.css', '!*.min.css'],
			      dest: 'dist/css',
			      ext: '.min.css'
			    }]
			  }
			},
      imagemin: {                           
          dynamic: {                         
            files: [{
              expand: true,                  
              cwd: 'src/',                   
              src: ['img/*.{png,jpg,gif}'],   
              dest: 'dist/img'                
            }]
          }
        },
        uglify: {
              target: {
                files: {
                  'dist/js/script.min.js': ['src/js/*.js']
                }
              }
            },
      // JS Test
			jshint: {
			    all: ['Gruntfile.js', 'src/js/*.js']
			  },
              //watch
            watch:{
            	options: {livereload:true},
                postcss: {
                    files: 'src/css/style.css',
                    tasks: ['postcss']
                },
                js : {
                	files: 'src/js/*.js',
                	tasks: ['jshint']
                }
            }//Watch

            
  	});


    // Build Task
  	grunt.registerTask('build', ['cssmin', 'imagemin', 'uglify']);

  	//NPM Tasks
  	grunt.loadNpmTasks('grunt-contrib-watch');

  	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

  	grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-postcss');
};