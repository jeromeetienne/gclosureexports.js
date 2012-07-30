# makefile to automatize simple operations

GCLOSURE_TEMPFILE := $(shell mktemp /tmp/gclosureexports.tmp.XXXXXX)

minifyRemoteSimple:
	curl --data-urlencode "js_code@sample.js"	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile		\
		> sample.min.js
	@echo size minified + gzip is `gzip -c sample.min.js | wc -c` byte

minifyRemoteAdvanced:
	../../bin/tool.js sample.js sample.gclosureexports.js	> ${GCLOSURE_TEMPFILE}
	curl --data-urlencode "js_code@${GCLOSURE_TEMPFILE}" 		\
		-d "output_format=text&output_info=compiled_code&compilation_level=ADVANCED_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile		\
		> sample.min.js
	@rm -f /tmp/gclosureexports.tmp.mavzDXrm ${GCLOSURE_TEMPFILE}
	@echo size minified + gzip is `gzip -c sample.min.js | wc -c` byte

##################################################################################
##										##
##################################################################################
CLOSUREC=java -jar ~/opt/closure-compiler/compiler.jar
minifyLocalSimple:
	$(CLOSUREC) --js sample.js > sample.min.js
	@echo size minified + gzip is `gzip -c sample.min.js | wc -c` byte

minifyLocalAdvanced:
	../../bin/tool.js sample.js sample.gclosureexports.js	> ${GCLOSURE_TEMPFILE}
	$(CLOSUREC) --compilation_level ADVANCED_OPTIMIZATIONS --js ${GCLOSURE_TEMPFILE} > sample.min.js
	@echo size minified + gzip is `gzip -c sample.min.js | wc -c` byte

#java -jar ~/opt/closure-compiler/compiler.jar --js slota.tmp.js 
#--compilation_level ADVANCED_OPTIMIZATIONS

