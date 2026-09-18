# RDS DB Subnet Group


resource "aws_db_subnet_group" "rds_subnets" {
  name        = "${var.project_prefix}-db-subnet-group"
  description = "RDS Subnet Group across AZs"

  subnet_ids = [
    aws_subnet.private_db_a.id,
    aws_subnet.private_db_b.id
  ]

  tags = {
    Name = "${var.project_prefix}-db-subnet-group"
  }
}



# PostgreSQL RDS Instance


resource "aws_db_instance" "postgres" {
  identifier = "${var.project_prefix}-rds"

  # ----------------------------------------------------------
  # PostgreSQL
  # ----------------------------------------------------------

  engine         = "postgres"
  engine_version = "16.3"

  # RDS instance size
  instance_class = "db.t4g.micro"

  # ----------------------------------------------------------
  # Storage
  # ----------------------------------------------------------

  allocated_storage     = 20
  max_allocated_storage = 20
  storage_type          = "gp3"

  # ----------------------------------------------------------
  # Database credentials
  # ----------------------------------------------------------

  db_name  = "genesis"
  username = "genesis_admin"
  password = var.db_password

  # ----------------------------------------------------------
  # Network
  # ----------------------------------------------------------

  db_subnet_group_name = aws_db_subnet_group.rds_subnets.name

  vpc_security_group_ids = [
    aws_security_group.db_sg.id
  ]

  # RDS must NOT be publicly accessible
  publicly_accessible = false

  # Single-AZ deployment
  multi_az = false

  # ----------------------------------------------------------
  # Deletion / backup settings
  # ----------------------------------------------------------

  skip_final_snapshot = true
  deletion_protection = false

  backup_retention_period = 0

  # ----------------------------------------------------------
  # Tags
  # ----------------------------------------------------------

  tags = {
    Name = "${var.project_prefix}-postgres-rds"
  }
}
