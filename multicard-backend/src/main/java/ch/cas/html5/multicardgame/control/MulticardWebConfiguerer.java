package ch.cas.html5.multicardgame.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MulticardWebConfiguerer implements WebMvcConfigurer {

    @Autowired
    private ApmpfBaseConfig apmpfBaseConfig;

    /*
     * Serves our angular app as a static resource.
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(apmpfBaseConfig.getWebappServerSubContext() + "/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        } else {
                            // fuer die Unterstuetzung von HTML5 Routing (push state routing) werden Requests zu
                            // unbekannten Resources innerhalb des WebappServerSubContexts auf die Index Seite redirected
                            // (https://angular.io/guide/deployment#server-configuration)
                            final ClassPathResource indexResource = new ClassPathResource("/static/index.html");
                            return indexResource.exists() && indexResource.isReadable() ? indexResource : null;
                        }
                    }
                });
    }

}

