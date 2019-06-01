!(function(e) {
  var t = {};
  function n(a) {
    if (t[a]) return t[a].exports;
    var l = (t[a] = { i: a, l: !1, exports: {} });
    return e[a].call(l.exports, l, l.exports, n), (l.l = !0), l.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, a) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var a = Object.create(null);
      if (
        (n.r(a),
        Object.defineProperty(a, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var l in e)
          n.d(
            a,
            l,
            function(t) {
              return e[t];
            }.bind(null, l)
          );
      return a;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function(e, t) {
    const n = document.getElementById("contents");
    class a extends React.Component {
      render() {
        return React.createElement(
          "div",
          null,
          "Placeholder text for the Issue Filter."
        );
      }
    }
    function l(e) {
      const t = e.issues.map(e =>
        React.createElement(c, { key: e.id, issue: e })
      );
      return React.createElement(
        "table",
        { className: "bordered-table" },
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement("th", null, "Id"),
            React.createElement("th", null, "Status"),
            React.createElement("th", null, "Owner"),
            React.createElement("th", null, "Created"),
            React.createElement("th", null, "Effort"),
            React.createElement("th", null, "Completion"),
            React.createElement("th", null, "Title")
          )
        ),
        React.createElement("tbody", null, t)
      );
    }
    class r extends React.Component {
      constructor() {
        super(), (this.handleSubmit = this.handleSubmit.bind(this));
      }
      handleSubmit(e) {
        e.preventDefault();
        var t = document.forms.issueAdd;
        this.props.createIssue({
          owner: t.owner.value,
          title: t.title.value,
          status: "New",
          created: new Date()
        }),
          (t.owner.value = ""),
          (t.title.value = "");
      }
      render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "form",
            { name: "issueAdd", onSubmit: this.handleSubmit },
            React.createElement("input", {
              type: "text",
              name: "owner",
              placeholder: "Owner"
            }),
            React.createElement("input", {
              type: "text",
              name: "title",
              placeholder: "title"
            }),
            React.createElement("button", null, "Add")
          )
        );
      }
    }
    const c = e =>
      React.createElement(
        "tr",
        null,
        React.createElement("td", null, e.issue.id),
        React.createElement("td", null, e.issue.status),
        React.createElement("td", null, e.issue.owner),
        React.createElement("td", null, e.issue.created.toDateString()),
        React.createElement("td", null, e.issue.effort),
        React.createElement(
          "td",
          null,
          e.issue.completionDate ? e.issue.completionDate.toDateString() : ""
        ),
        React.createElement("td", null, e.issue.title)
      );
    (c.propTypes = {
      issue_id: React.PropTypes.number.isRequired,
      issue_title: React.PropTypes.string
    }),
      (c.defaultProps = { issue_id: 0, issue_title: "--no title --" });
    ReactDOM.render(
      React.createElement(
        class extends React.Component {
          constructor() {
            super(),
              (this.state = { issues: [] }),
              (this.createIssue = this.createIssue.bind(this));
          }
          componentDidMount() {
            this.loadData();
          }
          loadData() {
            fetch("/api/issues")
              .then(e => e.json())
              .then(e => {
                console.log("Total count of records:", e._metadata.total_count),
                  e.records.forEach(e => {
                    (e.created = new Date(e.created)),
                      e.completionDate &&
                        (e.completionDate = new Date(e.completionDate));
                  }),
                  this.setState({ issues: e.records });
              })
              .catch(e => {
                console.log(e);
              });
          }
          createIssue(e) {
            fetch("/api/issues", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(e)
            })
              .then(e => e.json())
              .then(e => {
                (e.created = new Date(e.completionDate)),
                  e.completionDate &&
                    (e.completionDate = new Date(e.completionDate));
                const t = this.state.issues.concat(e);
                this.setState({ issues: t });
              })
              .catch(e => {
                alert("Error in sending data to server: " + e.message);
              });
          }
          render() {
            return (
              console.log("I have been called"),
              React.createElement(
                "div",
                null,
                React.createElement("h1", null, "IssueTracker"),
                React.createElement(a, null),
                React.createElement("hr", null),
                React.createElement(l, { issues: this.state.issues }),
                React.createElement("hr", null),
                React.createElement(r, { createIssue: this.createIssue })
              )
            );
          }
        },
        null
      ),
      n
    );
  }
]);
