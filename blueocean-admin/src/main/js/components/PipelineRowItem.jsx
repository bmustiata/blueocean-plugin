import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { WeatherIcon } from '@jenkins-cd/design-language';

import { urlPrefix } from '../config';

export default class PipelineRowItem extends Component {

    calculateResponse(passing, failing) {
        let restponse = '-';
        if (failing > 0) {
            restponse = (`${failing} failing`);
        } else if (passing > 0) {
            restponse = (`${passing} passing`);
        }
        return restponse;
    }

    render() {
        const { pipeline } = this.props;
        // Early out
        if (!pipeline) {
            return null;
        }
        const simple = !pipeline.branchNames;
        const {
            name,
            weatherScore,
            numberOfSuccessfulBranches,
            numberOfFailingBranches,
            numberOfSuccessfulPullRequests,
            numberOfFailingPullRequests,
            } = pipeline;

        const hasPullRequests = !simple && (
            numberOfSuccessfulPullRequests || numberOfFailingPullRequests);

        const multiBranchURL = `${urlPrefix}/${name}/branches`;
        const pullRequestsURL = `${urlPrefix}/${name}/pr`;
        const activitiesURL = `${urlPrefix}/${name}/activity`;

        let multiBranchLabel = ' - ';
        let multiPrLabel = ' - ';
        let multiBranchLink = null;
        let pullRequestsLink = null;

        if (!simple) {
            multiBranchLabel = this.calculateResponse(
                numberOfSuccessfulBranches, numberOfFailingBranches);
            multiPrLabel = this.calculateResponse(
                numberOfSuccessfulPullRequests, numberOfFailingPullRequests);

            multiBranchLink = <Link className="btn" to={multiBranchURL}>multiBranch</Link>;

            if (hasPullRequests) {
                pullRequestsLink = <Link className="btn" to={pullRequestsURL}>pr</Link>;
            }
        }

        // FIXME: Visual alignment of the last column
        return (
            <tr>
                <td>{name}</td>
                <td><WeatherIcon score={weatherScore} /></td>
                <td>{multiBranchLabel}</td>
                <td>{multiPrLabel}</td>
                <td>
                    <i className="material-icons">&#xE83A;</i>
                    {multiBranchLink}
                    {pullRequestsLink}
                    <Link className="btn" to={activitiesURL}>Activities</Link>
                </td>
            </tr>
        );
    }
}

PipelineRowItem.propTypes = {
    pipeline: PropTypes.object.isRequired,
};