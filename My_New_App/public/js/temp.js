this.dbClient = this.controller.dbClient({
  load: function(done) {
    var readActive, readDone;
    readActive = readDone = false;
    this.dbClient.mkdir('/active', (function(_this) {
      return function(error, stat) {
        return _this.dbClient.readdir('/active', function(error, entries, dir_stat, entry_stats) {
          if (error) {
            return _this.showError(error);
          }
          _this.active = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = entry_stats.length; _i < _len; _i++) {
              stat = entry_stats[_i];
              _results.push(Task.fromStat(stat));
            }
            return _results;
          })();
          readActive = true;
          if (readActive && readDone) {
            return done();
          }
        });
      };
    })(this));
    this.dbClient.mkdir('/done', (function(_this) {
      return function(error, stat) {
        return _this.dbClient.readdir('/done', function(error, entries, dir_stat, entry_stats) {
          if (error) {
            return _this.showError(error);
          }
          _this.done = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = entry_stats.length; _i < _len; _i++) {
              stat = entry_stats[_i];
              _results.push(Task.fromStat(stat));
            }
            return _results;
          })();
          readDone = true;
          if (readActive && readDone) {
            return done();
          }
        });
      };
    })(this));
    return this;
  }
});