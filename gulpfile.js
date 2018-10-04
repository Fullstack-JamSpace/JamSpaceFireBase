// this is a file required per the gulp documentation
// semantic-ui requires gulp to build its components during setup
// this file hopefully is only needed during the semantic-ui setup / build
// process and can live here and not in /src

// note: using ES6 'import gulp...' breaks gulp CLI, so sticking with 'require'
var gulp = require('gulp')

gulp.task('default', function() {
  console.log('running project root ./gulpfile.js')
  // place code for your default task here
});
