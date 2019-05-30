const contentNode = document.getElementById("contents");

class IssueFilter extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "Placeholder text for the Issue Filter."
    );
  }
}

class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => React.createElement(IssueRow, { key: issue.id, issue: issue }) //look into the key={issue.id}
    );
    return React.createElement(
      "table",
      { style: { borderCollapse: "collapse" } },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Id"
          ),
          React.createElement(
            "th",
            null,
            "Status"
          ),
          React.createElement(
            "th",
            null,
            "Owner"
          ),
          React.createElement(
            "th",
            null,
            "Created"
          ),
          React.createElement(
            "th",
            null,
            "Effort"
          ),
          React.createElement(
            "th",
            null,
            "Completion"
          ),
          React.createElement(
            "th",
            null,
            "Title"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        issueRows
      )
    );
  }
}

class IssueAdd extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "This is a placeholde for and Issue add entry form"
    );
  }
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        null,
        issue.id
      ),
      React.createElement(
        "td",
        null,
        issue.status
      ),
      React.createElement(
        "td",
        null,
        issue.owner
      ),
      React.createElement(
        "td",
        null,
        issue.created.toDateString()
      ),
      React.createElement(
        "td",
        null,
        issue.effort
      ),
      React.createElement(
        "td",
        null,
        issue.completionDate ? issue.completionDate.toDateString() : ""
      ),
      React.createElement(
        "td",
        null,
        issue.title
      )
    );
  }
}

IssueRow.propTypes = {
  issue_id: React.PropTypes.number.isRequired,
  issue_title: React.PropTypes.string
};

IssueRow.defaultProps = {
  issue_id: 0,
  issue_title: "--no title --"
};

const issues = [{
  id: 1,
  status: "Open",
  owner: "Ravan",
  created: new Date("2016-08-15"),
  effort: 5,
  completionDate: undefined,
  title: "Error in console when cilcking Add"
}, {
  id: 2,
  status: "Assigned",
  owner: "Eddie",
  created: new Date("2016-08-16"),
  effort: 14,
  completionDate: new Date("2016-08-30"),
  title: "Missing bottom border on panel"
}];

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createTestIssue = this.createTestIssue.bind(this);
    setTimeout(this.createTestIssue, 2000);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ issues: issues });
    }, 500);
  }
  createIssue(newIssue) {
    const newIssues = this.state.issues.slice();
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue);
    this.setState({ issues: newIssues });
  }
  createTestIssue() {
    this.createIssue({
      status: "New",
      owner: "Pieta",
      created: new Date(),
      title: "Completion date should be optional"
    });
  }
  render() {
    console.log("I have been called");
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "IssueTracker"
      ),
      React.createElement(IssueFilter, null),
      React.createElement("hr", null),
      React.createElement(IssueTable, { issues: this.state.issues }),
      React.createElement(
        "button",
        { onClick: this.createTestIssue },
        "Add"
      ),
      " ",
      React.createElement("hr", null),
      React.createElement(IssueAdd, null)
    );
  }
}

ReactDOM.render(React.createElement(IssueList, null), contentNode);