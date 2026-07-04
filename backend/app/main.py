import arxiv
import requests


def download_paper(arxiv_id: str, filename: str = None):
    """
    Download a single arXiv paper by ID.

    Args:
        arxiv_id (str): Any valid arXiv ID (e.g. "1706.03762")
        filename (str): Optional custom filename

    Returns:
        dict: paper metadata + saved file path
    """

    client = arxiv.Client()

    # Search by ANY valid ID
    search = arxiv.Search(id_list=[arxiv_id])

    results = list(client.results(search))

    if not results:
        raise ValueError(f"No paper found for ID: {arxiv_id}")

    paper = results[0]

    title = paper.title
    authors = [a.name for a in paper.authors]
    published = paper.published
    pdf_url = paper.pdf_url

    # safe filename
    if filename is None:
        safe_title = title.replace(" ", "_").replace("/", "_")
        filename = f"{safe_title}.pdf"

    # download PDF
    response = requests.get(pdf_url)

    if response.status_code != 200:
        raise Exception("Failed to download PDF")

    with open(filename, "wb") as f:
        f.write(response.content)

    return {
        "title": title,
        "authors": authors,
        "published": str(published),
        "pdf_url": pdf_url,
        "file_path": filename
    }


# Example usage
if __name__ == "__main__":
    paper = download_paper("1312.5602")
    print("Downloaded:", paper["title"])