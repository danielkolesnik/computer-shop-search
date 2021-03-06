INSERT INTO "Rams" (id, model, memory, "memoryType", frequency, "createdAt", "updatedAt") VALUES
	(1, 'Kingston HyperX', 8, 'DDR4', 3000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(2, 'Kingston HyperX', 16, 'DDR4', 3000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(3, 'Corsair', 8, 'DDR4', 2666, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(4, 'Corsair', 16, 'DDR4', 2666, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185');

INSERT INTO "Processors" (id, manufacturer, model, cores, threads, "createdAt", "updatedAt") VALUES
	(1, 'Intel', 'Core i3 8th gen', 4, 4, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(2, 'Intel', 'Core i5 8th gen', 6, 6, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(3, 'Intel', 'Core i7 8th gen', 6, 12, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(4, 'Intel', 'Core i5 10th gen', 6, 12, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(5, 'Intel', 'Core i7 10th gen', 8, 16, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(6, 'Intel', 'Core i9 10th gen', 10, 20, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(7, 'AMD', 'Ryzen Threadripper 3990X', 64, 128, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185');

INSERT INTO "Gpus" (id, manufacturer, model, memory, "memoryType", "createdAt", "updatedAt") VALUES
	(1, 'NVIDIA', 'GTX 1050', 3072, 'GDDR5', '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(2, 'NVIDIA', 'GTX 1050 Ti', 4096, 'GDDR5', '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(3, 'NVIDIA', 'GTX GTX 1060', 6144, 'GDDR5', '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(4, 'NVIDIA', 'GTX 1080', 8192, 'GDDR5', '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(5, 'NVIDIA', 'GTX 1080 Ti', 11264, 'GDDR5', '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(6, 'NVIDIA', 'RTX 2060 Super', 8192, 'GDDR6', '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(7, 'NVIDIA', 'RTX 2080 Ti', 11264, 'GDDR6', '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185');

INSERT INTO "Computers" (id, model, "ProcessorId", "GpuId", price, "createdAt", "updatedAt") VALUES
	(1, 'A-123', 1, 1, 10000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(2, 'B-123', 2, 2, 15000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(3, 'C-123', 3, 3, 20000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(4, 'D-123', 4, 4, 25000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(5, 'E-123', 5, 5, 30000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(6, 'F-123', 6, 6, 35000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185'),
	(7, 'G-123', 7, 7, 40000, '2019-02-13 16:40:41.185', '2019-02-13 16:40:41.185');

INSERT INTO "RamsToComputers" (id, "ComputerId", "RamId") VALUES
	(1, 1, 3),
	(2, 2, 3),
	(3, 2, 3),
	(4, 3, 4),
	(5, 4, 3),
	(6, 4, 3),
	(7, 5, 3),
	(8, 5, 3),
	(9, 5, 3),
	(10, 5, 3),
	(11, 6, 1),
	(12, 6, 1),
	(13, 6, 1),
	(14, 6, 1),
	(15, 7, 2),
	(16, 7, 2),
	(17, 7, 2),
	(18, 7, 2);
