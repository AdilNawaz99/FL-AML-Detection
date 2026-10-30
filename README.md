# Privacy-Preserving Federated Deep Learning for Financial Fraud Detection under Non-IID Bank Data

This repository is being built as a reproducible academic research system for
fraud detection with a centralized DNN baseline and simulated federated
learning across logically separate banks. The first implementation stage has
created the project scaffold and configuration only; no dataset has been
loaded and no experimental result has been generated.

## Research question

How do centralized learning, FedAvg, FedProx, and a documented adaptive or
personalized aggregation approach compare for financial-fraud detection when
simulated bank data are IID or non-IID?

## Dataset setup

Download the ULB Credit Card Fraud Detection CSV manually, name it
`creditcard.csv`, and place it at:

`data/raw/creditcard.csv`

The dataset is deliberately ignored by Git. The pipeline will validate its
schema and report data quality before any split or transformation is applied.

## Environment status

The detected local interpreter is Python 3.10.3. At scaffold creation time,
the required packages (including TensorFlow and Flower) were not installed.
Install the pinned compatibility ranges after reviewing them:

```powershell
python -m pip install -r requirements.txt
```

The selected TensorFlow 2.15.1 / Flower 1.23.0 combination is compatible with
the detected Python 3.10.3 environment. On native Windows this setup should be
treated as CPU-first: modern TensorFlow GPU support requires WSL2. Future
training code will use a GPU automatically when TensorFlow exposes one,
otherwise it will use CPU.

Flower's Ray-based simulation extra is experimental on native Windows. WSL2 is
the recommended environment for a reliable GPU-backed or Ray-backed simulation;
the requirements remain pinned so the CPU-first baseline is reproducible.

## Planned workflow

1. Validate, split, and preprocess the ULB data without leakage.
2. Establish a class-weighted centralized DNN baseline.
3. Simulate IID and Dirichlet non-IID bank clients while preserving local raw
   records.
4. Compare FedAvg, FedProx, APFA, and local fine-tuning personalization.
5. Produce reproducible metrics, plots, communication-cost records, and
   research documentation.

Federated learning limits raw-data sharing in this simulation, but it does not
by itself provide complete privacy. The simulated clients are not actual banks,
and the ULB features `V1`–`V28` are anonymized.

## Current stage

The next approved stage will implement dataset loading, validation, and
leakage-safe splitting. See `config/config.yaml` for all default settings.

## Bank fraud intelligence UI

The project includes a dependency-free banking operations dashboard in
[`ui/index.html`](ui/index.html). It provides a high-level view of screened
transactions, fraud prevention, model/network health, priority alerts, and a
transaction risk analysis flow.

To preview it locally, run a static server from the project root:

```powershell
python -m http.server 8000 --directory ui
```

Then open `http://localhost:8000` in a browser. The current analysis flow uses
client-side demonstration scoring; connect its submit handler to the trained
model/API when production inference is available.
