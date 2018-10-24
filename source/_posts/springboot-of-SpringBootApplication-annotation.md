---
title: SpringBoot之SpringBootApplication注解
date: 2018-05-05 14:07:32
tags: [java,spring,springboot]
---

### 前言
我们在写SpringBoot项目的时候总是会在启动类里添加`@SpringBootApplication`注解，然后我们就可以启动
项目了，那么这个注解到底帮我们做了些什么事情呢？接下来我们就通过看源码来找答案。

### @SpringBootApplication
我们先写下面一段代码，然后通过IDE看下这个`@SpringBootApplication`注解类的内容
```java
@SpringApplication
public class Application{
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
```
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = {
		@Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
	...
}
```
可以看到这是一个复合注解，包含了很多其他注解，但是可能跟Spring有关的就是这个三个`@SpringBootConfiguration`,`@EnableAutoConfiguration`,`@ComponentScan`。那么我们现在住主要分析一下这三个。
首先是`@SpringBootConfiguration`,点进去发现这也是一个符合注解，包含了`@Configuration`注解。
```java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
public @interface SpringBootConfiguration {
}
```
这个就是SpringBoot里比较重要的注解了。这个注解的作用就是替代之前繁琐的xml文件配置，比如之前要是配置一个bean要这样写xml:
```xml
<bean id="userService" class="com.gentlehu.project.service.impl.UserServiceImpl">
</bean>
```
而现在在这个注解的帮助下我们只需要这样写就实现了对等的效果。
```java
@Configuration
public class DemoConfigration{
	
	@Bean
	public UserService userService(){
		return new UserServiceImpl();
	}
}
```
是不是感觉在配置的时候直观了很多呢。

### @ComponentScan

这个注解就看名知意了。就是扫描组件并注册用的。默认在当前所在类的package包开始扫描。所以，当你的项目
发现有些组件没有自动注册的话看下这个组件是不是在`@ComponentScan`所在包或者子包下。

### @EnableAutoConfiguration

这个注解看名字也很好理解，是就开启自动配置。秉承SpringBoot的设计理念：**约定优于配置**，意思是
如果我们共同遵守一个约定，那么有些东西我们是不需要手动配置的，大家都使用默认的就好了。打个比方：
学校开会，老师说大家按照学号的顺序坐下，然后大家遵守这个约定，就不需要每个人都去问下老师我应该坐在哪呀。
降低了沟通成本。而在项目中是降低了配置成本。

我们再继续点进`@EnableAutoConfiguration`类里面有什么。
```java
/**
 * Enable auto-configuration of the Spring Application Context, attempting to guess and
 * configure beans that you are likely to need. Auto-configuration classes are usually
 * applied based on your classpath and what beans you have defined. For example, If you
 * have {@code tomcat-embedded.jar} on your classpath you are likely to want a
 * {@link TomcatEmbeddedServletContainerFactory} (unless you have defined your own
 * {@link EmbeddedServletContainerFactory} bean).
 * <p>
 * When using {@link SpringBootApplication}, the auto-configuration of the context is
 * automatically enabled and adding this annotation has therefore no additional effect.
 * <p>
 * Auto-configuration tries to be as intelligent as possible and will back-away as you
 * define more of your own configuration. You can always manually {@link #exclude()} any
 * configuration that you never want to apply (use {@link #excludeName()} if you don't
 * have access to them). You can also exclude them via the
 * {@code spring.autoconfigure.exclude} property. Auto-configuration is always applied
 * after user-defined beans have been registered.
 * <p>
 * The package of the class that is annotated with {@code @EnableAutoConfiguration},
 * usually via {@code @SpringBootApplication}, has specific significance and is often used
 * as a 'default'. For example, it will be used when scanning for {@code @Entity} classes.
 * It is generally recommended that you place {@code @EnableAutoConfiguration} (if you're
 * not using {@code @SpringBootApplication}) in a root package so that all sub-packages
 * and classes can be searched.
 * <p>
 * Auto-configuration classes are regular Spring {@link Configuration} beans. They are
 * located using the {@link SpringFactoriesLoader} mechanism (keyed against this class).
 * Generally auto-configuration beans are {@link Conditional @Conditional} beans (most
 * often using {@link ConditionalOnClass @ConditionalOnClass} and
 * {@link ConditionalOnMissingBean @ConditionalOnMissingBean} annotations).
 *
 * @author Phillip Webb
 * @author Stephane Nicoll
 * @see ConditionalOnBean
 * @see ConditionalOnMissingBean
 * @see ConditionalOnClass
 * @see AutoConfigureAfter
 * @see SpringBootApplication
 */
@SuppressWarnings("deprecation")
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(EnableAutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
	...
}
```
开启自动配置只是我们在名字上得到的信息，具体做了什么还是要看类上面作者的注释。有朋友肯定会说，哎？我点击去怎么没看见注释呢，那是因为你没有导入源码包，这个你在网上下载源码包然后在IDE里配置下就好了。
*我建议把项目中依赖的源码包都下载下来，方便我们在源码上理解框架所做的事情。可能有人又说我依赖很多包，难到要我手动的一个一个的下载？当然不是，如果你用的IDEA系列的工具，是可以自动下载源码包的，这个不需要我们操心。*

下面是我自己对这个注释的翻译，如有错误还请斧正*(联系方式可以在[About页面](https://blog.gentlehu.com/about)找到)*。


> 开启Spring应用上下文的 `auto-configuration`，尝试猜测和配置你可能需要的beans，`Auto-configuration`类通常被应用在你的classpath下面的你希望定义的beans下面。
>
> 例如：如果你有`tomcat-embedded.jar`在你的classpath下面那么你可能想要`TomcatEmbeddedServletContainerFactory`(除非你已经定义了`EmbeddedServletContainerFactory` bean).当你使用`SpringBootApplication`，上下文的`auto-configuration`就会自动开启并且添加这个没有副作用的注解。
> 
> `auto-configuration` 尽可能智能的尝试并且当你定义更多你自己的配置的时候回退。你随时可以用 `excludeName` 手动排除任何你不需要应用的配置。你也可以通过 `spring.autoconfigure.exclude` 属性排除他们。
> 
> `auto-configuration` 总是在用户定义beans注册之后被应用。这个你用 `@EnableAutoConfiguration` 注解的类所在的包,通常是用 `@SpringBootApplication` 这个有特殊意义的注解作为默认。
>
> 例如：它在扫描 `@Entity` 类的时候被使用。一般建议你配置 `@EnableAutoConfiguration` (如果你不用 `@SpringBootApplication`) 在 root package 下，如此你的所有子包和类就可以被检索到。
> 
> `Auto-configuration` 类是普通的Spring `@Configuration` beans.他们被`SpringFactoriesLoader`的机制定位。一般 `auto-configuration` beans 都是 `@Conditional` beans(大部分时候使用 `@ConditionalOnClass` 和 `@ConditionalOnMissingBean` 注解).
>
> 这个类借助@Import的支持自动将所有符合条件的类加载到Spring容器。


还有个`@AutoConfigurationPackage`类，继续点进去看下，发现还是用了`@Import`注解把自动配置用到的`Registrar`类导入。

AutoConfigurationPackage:
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@Import(AutoConfigurationPackages.Registrar.class)
public @interface AutoConfigurationPackage {

}
```
Registrar.cass:
```java
/**
 * {@link ImportBeanDefinitionRegistrar} to store the base package from the importing
 * configuration.
 */
@Order(Ordered.HIGHEST_PRECEDENCE)
static class Registrar implements ImportBeanDefinitionRegistrar, DeterminableImports {

	@Override
	public void registerBeanDefinitions(AnnotationMetadata metadata,
			BeanDefinitionRegistry registry) {
		register(registry, new PackageImport(metadata).getPackageName());
	}

	@Override
	public Set<Object> determineImports(AnnotationMetadata metadata) {
		return Collections.<Object>singleton(new PackageImport(metadata));
	}

}

```

到这里你肯定会问了。那Spring怎么知道哪些类需要自动配置呢，这个时候查看源码包会发现了spring.factories文件。
这个文件位于`spring-boot-test-autoconfigure-1.5.7.RELEASE.jar的/META-INF/`下，并且不只是这个包下面有，很多jar包下面都有。

spring.factories:
```
# AutoConfigureCache auto-configuration imports
org.springframework.boot.test.autoconfigure.core.AutoConfigureCache=\
org.springframework.boot.autoconfigure.cache.CacheAutoConfiguration

# AutoConfigureDataJpa auto-configuration imports
org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa=\
org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration

# AutoConfigureDataMongo auto-configuration imports
org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo=\
org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,\
org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration,\
org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration

# AutoConfigureJdbc auto-configuration imports
org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureJdbc=\
org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.liquibase.LiquibaseAutoConfiguration,\
org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration

# AutoConfigureTestDatabase auto-configuration imports
org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase=\
org.springframework.boot.test.autoconfigure.jdbc.TestDatabaseAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration

# AutoConfigureJson auto-configuration imports
org.springframework.boot.test.autoconfigure.json.AutoConfigureJson=\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration

# AutoConfigureJsonTesters auto-configuration imports
org.springframework.boot.test.autoconfigure.json.AutoConfigureJsonTesters=\
org.springframework.boot.test.autoconfigure.json.JsonTestersAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration

# AutoConfigureMockMvc auto-configuration imports
org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc=\
org.springframework.boot.test.autoconfigure.web.servlet.MockMvcAutoConfiguration,\
org.springframework.boot.test.autoconfigure.web.servlet.MockMvcSecurityAutoConfiguration,\
org.springframework.boot.test.autoconfigure.web.servlet.MockMvcWebClientAutoConfiguration,\
org.springframework.boot.test.autoconfigure.web.servlet.MockMvcWebDriverAutoConfiguration

# AutoConfigureMockRestServiceServer
org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer=\
org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerAutoConfiguration

# AutoConfigureRestDocs auto-configuration imports
org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs=\
org.springframework.boot.test.autoconfigure.restdocs.RestDocsAutoConfiguration

# AutoConfigureTestDatabase auto-configuration imports
org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestDatabase=\
org.springframework.boot.test.autoconfigure.jdbc.TestDatabaseAutoConfiguration,\
org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration

# AutoConfigureTestEntityManager auto-configuration imports
org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureTestEntityManager=\
org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManagerAutoConfiguration

# AutoConfigureWebClient auto-configuration imports
org.springframework.boot.test.autoconfigure.web.client.AutoConfigureWebClient=\
org.springframework.boot.test.autoconfigure.web.client.WebClientRestTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration,\
org.springframework.boot.autoconfigure.web.HttpMessageConvertersAutoConfiguration,\
org.springframework.boot.autoconfigure.web.WebClientAutoConfiguration

# AutoConfigureWebMvc auto-configuration imports
org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc=\
org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration,\
org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration,\
org.springframework.boot.autoconfigure.groovy.template.GroovyTemplateAutoConfiguration,\
org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration,\
org.springframework.boot.autoconfigure.hateoas.HypermediaAutoConfiguration,\
org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration,\
org.springframework.boot.autoconfigure.mustache.MustacheAutoConfiguration,\
org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration,\
org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration,\
org.springframework.boot.autoconfigure.web.ErrorMvcAutoConfiguration,\
org.springframework.boot.autoconfigure.web.HttpMessageConvertersAutoConfiguration,\
org.springframework.boot.autoconfigure.web.ServerPropertiesAutoConfiguration,\
org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration

# DefaultTestExecutionListenersPostProcessors
org.springframework.boot.test.context.DefaultTestExecutionListenersPostProcessor=\
org.springframework.boot.test.autoconfigure.SpringBootDependencyInjectionTestExecutionListener$PostProcessor

# Spring Test ContextCustomizerFactories
org.springframework.test.context.ContextCustomizerFactory=\
org.springframework.boot.test.autoconfigure.OverrideAutoConfigurationContextCustomizerFactory,\
org.springframework.boot.test.autoconfigure.filter.TypeExcludeFiltersContextCustomizerFactory,\
org.springframework.boot.test.autoconfigure.properties.PropertyMappingContextCustomizerFactory,\
org.springframework.boot.test.autoconfigure.web.servlet.WebDriverContextCustomizerFactory

# Test Execution Listeners
org.springframework.test.context.TestExecutionListener=\
org.springframework.boot.test.autoconfigure.restdocs.RestDocsTestExecutionListener,\
org.springframework.boot.test.autoconfigure.web.client.MockRestServiceServerResetTestExecutionListener,\
org.springframework.boot.test.autoconfigure.web.servlet.MockMvcPrintOnlyOnFailureTestExecutionListener,\
org.springframework.boot.test.autoconfigure.web.servlet.WebDriverTestExecutionListener

```

那么一切都清晰了，其实Spring就是搜索classpath下所有的`META-INF/spring.factories`文件，然后通过反射自动注册到Spring容器中，就完成了自动配置。那么这个配置是由哪个类来读取呢？通过查找源码包发现了这么一个抽象类，有一个关键静态成员：`FACTORIES_RESOURCE_LOCATION`，它的值刚好是`META-INF/spring.factories`。
通过阅读代码逻辑和注释发现就是这个类读取的`spring.factories`文件，帮我们完成了SpringBoot的自动配置，为我们减轻了负担。

这仅仅是通过读源码发现的，其实你随意启动一个SpringBoot项目打开调试模式也能发现这样的逻辑。

org.springframework.core.io.support.SpringFactoriesLoader：
```java

/**
 * General purpose factory loading mechanism for internal use within the framework.
 *
 * <p>{@code SpringFactoriesLoader} {@linkplain #loadFactories loads} and instantiates
 * factories of a given type from {@value #FACTORIES_RESOURCE_LOCATION} files which
 * may be present in multiple JAR files in the classpath. The {@code spring.factories}
 * file must be in {@link Properties} format, where the key is the fully qualified
 * name of the interface or abstract class, and the value is a comma-separated list of
 * implementation class names. For example:
 *
 * <pre class="code">example.MyService=example.MyServiceImpl1,example.MyServiceImpl2</pre>
 *
 * where {@code example.MyService} is the name of the interface, and {@code MyServiceImpl1}
 * and {@code MyServiceImpl2} are two implementations.
 *
 * @author Arjen Poutsma
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @since 3.2
 */
public abstract class SpringFactoriesLoader {

	private static final Log logger = LogFactory.getLog(SpringFactoriesLoader.class);

	/**
	 * The location to look for factories.
	 * <p>Can be present in multiple JAR files.
	 */
	public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";


	/**
	 * Load and instantiate the factory implementations of the given type from
	 * {@value #FACTORIES_RESOURCE_LOCATION}, using the given class loader.
	 * <p>The returned factories are sorted in accordance with the {@link AnnotationAwareOrderComparator}.
	 * <p>If a custom instantiation strategy is required, use {@link #loadFactoryNames}
	 * to obtain all registered factory names.
	 * @param factoryClass the interface or abstract class representing the factory
	 * @param classLoader the ClassLoader to use for loading (can be {@code null} to use the default)
	 * @see #loadFactoryNames
	 * @throws IllegalArgumentException if any factory implementation class cannot
	 * be loaded or if an error occurs while instantiating any factory
	 */
	public static <T> List<T> loadFactories(Class<T> factoryClass, ClassLoader classLoader) {
		Assert.notNull(factoryClass, "'factoryClass' must not be null");
		ClassLoader classLoaderToUse = classLoader;
		if (classLoaderToUse == null) {
			classLoaderToUse = SpringFactoriesLoader.class.getClassLoader();
		}
		List<String> factoryNames = loadFactoryNames(factoryClass, classLoaderToUse);
		if (logger.isTraceEnabled()) {
			logger.trace("Loaded [" + factoryClass.getName() + "] names: " + factoryNames);
		}
		List<T> result = new ArrayList<T>(factoryNames.size());
		for (String factoryName : factoryNames) {
			result.add(instantiateFactory(factoryName, factoryClass, classLoaderToUse));
		}
		AnnotationAwareOrderComparator.sort(result);
		return result;
	}

	/**
	 * Load the fully qualified class names of factory implementations of the
	 * given type from {@value #FACTORIES_RESOURCE_LOCATION}, using the given
	 * class loader.
	 * @param factoryClass the interface or abstract class representing the factory
	 * @param classLoader the ClassLoader to use for loading resources; can be
	 * {@code null} to use the default
	 * @see #loadFactories
	 * @throws IllegalArgumentException if an error occurs while loading factory names
	 */
	public static List<String> loadFactoryNames(Class<?> factoryClass, ClassLoader classLoader) {
		String factoryClassName = factoryClass.getName();
		try {
			Enumeration<URL> urls = (classLoader != null ? classLoader.getResources(FACTORIES_RESOURCE_LOCATION) :
					ClassLoader.getSystemResources(FACTORIES_RESOURCE_LOCATION));
			List<String> result = new ArrayList<String>();
			while (urls.hasMoreElements()) {
				URL url = urls.nextElement();
				Properties properties = PropertiesLoaderUtils.loadProperties(new UrlResource(url));
				String factoryClassNames = properties.getProperty(factoryClassName);
				result.addAll(Arrays.asList(StringUtils.commaDelimitedListToStringArray(factoryClassNames)));
			}
			return result;
		}
		catch (IOException ex) {
			throw new IllegalArgumentException("Unable to load [" + factoryClass.getName() +
					"] factories from location [" + FACTORIES_RESOURCE_LOCATION + "]", ex);
		}
	}

	@SuppressWarnings("unchecked")
	private static <T> T instantiateFactory(String instanceClassName, Class<T> factoryClass, ClassLoader classLoader) {
		try {
			Class<?> instanceClass = ClassUtils.forName(instanceClassName, classLoader);
			if (!factoryClass.isAssignableFrom(instanceClass)) {
				throw new IllegalArgumentException(
						"Class [" + instanceClassName + "] is not assignable to [" + factoryClass.getName() + "]");
			}
			Constructor<?> constructor = instanceClass.getDeclaredConstructor();
			ReflectionUtils.makeAccessible(constructor);
			return (T) constructor.newInstance();
		}
		catch (Throwable ex) {
			throw new IllegalArgumentException("Unable to instantiate factory class: " + factoryClass.getName(), ex);
		}
	}

}

```

很多同学知道SpringBoot项目在入口类上加上`@EnableAutoConfiguration`就能自动配置，却不知道为何SpringBoot为何如此智能的帮我配置了，
希望读者看到这篇博文后知道SpringBoot是如何实现自动配置的。更详细的过程可以自己动手调试SpringBoot项目了解。













