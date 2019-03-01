### Reliable logger library

Main purpose: many loggers write instances - one logger reader

[logger_writer] -> [redis reliable queue] -> [logger_reader]

Each logger writer instance pass application name, unique identifier (instance id), date and log record.
Logger reader consumes records from redis queue format them and pass them to file or another destination
