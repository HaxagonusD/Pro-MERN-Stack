const contentNode = document.getElementById("contents");

class IssueFilter extends React.Component {
  render() {
    return <div>Placeholder text for the Issue Filter.</div>;
  }
}

class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => (
      <IssueRow key={issue.id} issue={issue} /> //look into the key={issue.id}
    ));
    return (
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Completion</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{issueRows}</tbody>
      </table>
    );
  }
}

class IssueAdd extends React.Component {
  render() {
    return <div>This is a placeholde for and Issue add entry form</div>;
  }
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>
          {issue.completionDate ? issue.completionDate.toDateString() : ""}
        </td>
        <td>{issue.title}</td>
      </tr>
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

const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when cilcking Add"
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel"
  }
];

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
    return (
      <div>
        <h1>IssueTracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <button onClick={this.createTestIssue}>Add</button> <hr />
        <IssueAdd />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
