import React from 'react';
import { Grid, withStyles, Link } from '@material-ui/core';
import AboutHeader from '../../components/About/HeaderView';
import externalIcon from '../../assets/about/About-ExternalLink.svg';

const AboutBody = ({ classes, data }) => (
  <>
    <AboutHeader title={data.title} />
    <div className={classes.container}>
      <Grid container spacing={16} direction="row" className={classes.aboutSection}>
        <Grid item lg={3} md={3} sm={12} xs={12} className={classes.leftSection}>
          <img className={classes.img} src={data.img} alt="about" />
        </Grid>
        <Grid item lg={9} md={9} sm={12} xs={12} className={classes.rightSection}>
          {data.content ? data.content.map((paragraphObj) => (
            <>
              <div className={classes.text}>
                { paragraphObj.paragraph.split('$$').map((splitedParagraph) => (
                // Checking for regex ()[] pattern
                  (splitedParagraph != null && (/\[(.+)\]\((.+)\)/g.test(splitedParagraph)) ? (
                    <>
                      <Link
                        title="Cloud Resources."
                        target="_blank"
                        rel="noreferrer"
                        href={splitedParagraph.match(/\((.*)\)/).pop()}
                        color="inherit"
                        className={classes.link}
                      >
                        {splitedParagraph.match(/\[(.*)\]/).pop()}
                      </Link>
                      <img
                        src={externalIcon}
                        alt="outbounnd web site icon"
                        className={classes.linkIcon}
                      />
                    </>
                  ) : splitedParagraph
                  )))}
              </div>
              <br />
            </>
          )) : ''}
          { data.table && (
          <div className={classes.tableDiv}>
            <table className={classes.table}>
              <thead className={classes.tableHeader}>
                <tr className={classes.tableBodyRow}>
                  <th className={classes.headerCell} aria-label="Index" />
                  <th className={classes.headerCell}>Name</th>
                  <th className={classes.headerCell}>Institution</th>
                  <th className={classes.headerCell}>Affiliation</th>
                  <th className={classes.headerCell}>SubCommitee(s)</th>
                </tr>
              </thead>
              <tbody>

                { data.table.map((rowObj, index) => (
                  <>
                    <tr className={classes.tableBodyRow}>
                      <td className={classes.tableCell}>{index + 1}</td>
                      <td className={classes.tableCell}>{rowObj.row[0].name}</td>
                      <td className={classes.tableCell}>{rowObj.row[1].institution}</td>
                      <td className={classes.tableCell}>{rowObj.row[2].affliation}</td>
                      <td className={classes.tableCell}>{rowObj.row[3].subcommitee}</td>
                    </tr>
                  </>
                )) }
              </tbody>
            </table>
          </div>
          )}
        </Grid>
      </Grid>
    </div>
  </>
);

const styles = () => ({
  container: {
    margin: '16px auto 16px auto',
    color: '#000000',
    fontFamily: '"Open Sans"',
    fontSize: '15px',
    lineHeight: '22px',
    maxWidth: '1440px',
  },
  text: {
    // height: '476px',
    // width: '675px',
    color: '#000000',
    fontFamily: '"Open Sans"',
    fontSize: '15px',
    lineHeight: '22px',
  },
  title: {
    color: '#0B3556',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  rightSection: {
    padding: '8px 25px !important',
    float: 'left',
  },
  leftSection: {
    float: 'left',
  },
  aboutSection: {
    margin: '60px auto 60px auto',
  },
  img: {
    width: '100%',
  },
  linkIcon: {
    width: '20px',
    verticalAlign: 'sub',
    margin: '0px 0px 0px 2px',
  },
  link: {
    color: '#0296C9',
    '&:hover': {
      color: '#0296C9',
    },
  },
  tableDiv: {
    marginTop: '45px',
  },
  table: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '0.025em',
    lineHeight: '30px',
    textAlign: 'left',
    width: '100%',
  },
  tableHeader: {
    fontFamily: 'Raleway',
    color: '#194563',
    textTransform: 'uppercase',

  },
  tableBodyRow: {
    borderSpacing: '0',
    borderCollapse: 'collapse',
    '&:nth-child(even)': {
      color: '#3B607D',
    },
    '&:nth-child(odd)': {
      color: '#3E7AAA',
    },
  },
  tableCell: {
    fontFamily: '"Open Sans"',
    fontSize: '14px',
    padding: '8px 15px 8px 0px',
    borderBottom: '0.66px solid #087CA5',
  },
  headerCell: {
    borderBottom: '4px solid #087CA5',
    borderSpacing: '0',
    borderCollapse: 'collapse',
    fontWeight: 'bolder',
  },
});

AboutBody.defaultProps = {
  classes: {},
  data: {
    content: [],
  },
};

export default withStyles(styles)(AboutBody);
