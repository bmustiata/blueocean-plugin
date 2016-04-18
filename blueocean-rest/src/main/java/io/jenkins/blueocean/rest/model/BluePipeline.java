package io.jenkins.blueocean.rest.model;

import org.kohsuke.stapler.export.Exported;

/**
 * Defines pipeline state and its routing
 *
 * @author Vivek Pandey
 */
public abstract class BluePipeline extends Resource {
    public static final String ORGANIZATION="organization";
    public static final String NAME="name";
    public static final String DISPLAY_NAME="displayName";
    public static final String BRANCHES="branches";
    public static final String RUNS="runs";
    public static final String WEATHER_SCORE ="weatherScore";
    public static final String LATEST_RUN = "latestRun";


    /**
     * @return name of the organization
     */
    @Exported(name = ORGANIZATION)
    public abstract String getOrganization();

    /**
     * @return name of the pipeline
     */
    @Exported(name = NAME)
    public abstract String getName();

    /**
     * @return human readable name of this pipeline
     */
    @Exported(name = DISPLAY_NAME)
    public abstract String getDisplayName();


    /**
     * @return weather health score percentile
     */
    @Exported(name = WEATHER_SCORE)
    public abstract int getWeatherScore();

    /**
     * @return The Latest Run for the branch
     */
    @Exported(name = LATEST_RUN, inline = true)
    public abstract BlueRun getLatestRun();


    /**
     * @return Gives Runs in this pipeline
     */
    public abstract BlueRunContainer getRuns();

}
