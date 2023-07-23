
kill-process:
	@chmod +x killPID.sh
	@./killPID.sh 
json-server:
	json-server --watch output.json
db-seed:
	npx prisma db seed


# make -j2 a b 同時執行 a 跟 b 兩個任務 2是指定執行兩個
a:
	@echo asdf

b:
	@echo bdsf
